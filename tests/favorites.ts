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
  const favoriteColor = 'purple';
  const favoriteHobbies = ['skiing', 'skydiving', 'biking'];

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

});
