import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from 'chai';

describe("favorites", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.favorites as Program<Favorites>;
  
  const user = (provider.wallet as anchor.Wallet).payer;
  const someRandomGuy = anchor.web3.Keypair.generate();

  // Here's what we want to write to the blockchain
  const favoriteNumber = new anchor.BN(6);
  const favoriteColor = 'red';
  const favoriteHobbies = ['basketball', '3D-printing', 'UAS'];

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / anchor.web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
    console.log(`Balance: ${formattedBalance} SOL`);
  });

  it("Saying Hello!", async () => {
    const tx = await program.methods.sayHello().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Setting user favorites on the blockchain", async () => {
    const tx = await program.methods.setFavorites(
      favoriteNumber,
      favoriteColor,
      favoriteHobbies
    )
    .signers([user])
    .rpc();

    // Retrieve the associated PDA --> [pubkey, bump-seed] --> at index 0 of return value
    const favorites_pda_key = anchor.web3.PublicKey
    .findProgramAddressSync(
      [Buffer.from('favorites'), user.publicKey.toBuffer()], 
      program.programId)[0];

    const data = await program.account.favorites.fetch(favorites_pda_key);

    // And make sure it matches!
    assert.equal(data.color, favoriteColor);
    assert.equal(data.number.toString(), favoriteNumber.toString());
    assert.deepEqual(data.hobbies, favoriteHobbies);
  })

  it("Update favorites information", async () =>  {
    const newFavoriteHobbies = ['basketball', '3D-printing', 'UAS', 'Solana'];
    try {
      const tx = await program.methods.setFavorites(
        favoriteNumber,
        favoriteColor,
        newFavoriteHobbies
      )
      .signers([user])
      .rpc();
    } catch (error) {
      console.error((error as Error).message);
      throw new Error((error as Error).message)
    }
  })

  it("Reject setting favorites for unauthorized signers", async () => {
    try {
      await program.methods
        .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
        // Try to set account information of the user using another signer (random guy)
        .accounts({
          user: user.publicKey
        })
        .signers([someRandomGuy])
        .rpc();
    } catch (error) {
      const errorMessage = (error as Error).message;
      assert.isTrue(errorMessage.includes('unknown signer'));
    }
  })

  it("Let random guy set his favorites", async () => {
    // First give the random guy some solana
    const latestBlockhash = await provider.connection.getLatestBlockhash();
    const airdropSignature = await provider.connection.requestAirdrop(
      someRandomGuy.publicKey,
      anchor.web3.LAMPORTS_PER_SOL // 1 SOL
    );
    await provider.connection.confirmTransaction({
      signature: airdropSignature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    });

    try {
      const tx = await program.methods.setFavorites(
        favoriteNumber,
        "blue",
        ["being random"]
      )
      .accounts(
        {
          user: someRandomGuy.publicKey
        }
      )
      .signers([someRandomGuy])
      .rpc();
    } catch (error) {
      throw new Error((error as Error).message)
    }
    

    // Retrieve the associated PDA --> [pubkey, bump-seed] --> at index 0 of return value
    const favorites_pda_key = anchor.web3.PublicKey
    .findProgramAddressSync(
      [Buffer.from('favorites'), someRandomGuy.publicKey.toBuffer()], 
      program.programId)[0];

    const data = await program.account.favorites.fetch(favorites_pda_key);

    // And make sure it matches!
    assert.equal(data.color, "blue");
    assert.equal(data.number.toString(), favoriteNumber.toString());
    assert.deepEqual(data.hobbies, ["being random"]);
  })

  it("Let user want to read it's hobbies", async () => {
    try {
      const tx = await program.methods.getFavorites()
      .signers([user])
      .rpc();
    } catch (error) {
      throw new Error((error as Error).message)
    }
  })

});
