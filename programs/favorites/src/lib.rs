use anchor_lang::prelude::*;

declare_id!("HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod favorites {
    use super::*;

    pub fn say_hello(ctx: Context<SayHello>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favorites(ctx: Context<SetFavorites>, 
        number: u64, color: String, hobbies: Vec<String>) -> Result<()> {
            let user_pubkey = ctx.accounts.user.key();
            msg!("Greetings from {}", ctx.program_id);

            msg!(
                "User {user_pubkey}'s favorite number is {number}, favorite color is: {color}",
            );

            msg!(
                "User's hobbies are: {:?}",
                hobbies
            ); 
            
            // Updating these values on the blockchain
            ctx.accounts.favorites.set_inner(Favorites {
                number,
                color,
                hobbies
            });


            Ok(())

        }
    
    pub fn get_favorites(ctx: Context<GetFavorites>) -> Result<()> {
        let user_pubkey = ctx.accounts.user.key();
        msg!(
            "User {} wants to check what his hobbies are",
            user_pubkey
        );

        // Retrieve the user's Favorites
        let favorites = &ctx.accounts.favorites;

        msg!(
            "User's favorite number is {}, favorite color is {}, hobbies are {:?}",
            favorites.number,
            favorites.color,
            favorites.hobbies
        );

        return Ok(())
    }

    
}


// What we will put inside the Favorites PDA
#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub color: String,

    #[max_len(5, 50)]
    pub hobbies: Vec<String>
}

#[derive(Accounts)]
pub struct SayHello {}

#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed, 
        payer = user, 
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE, 
        seeds=[b"favorites", user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetFavorites<'info> {
    #[account()]
    pub user: Signer<'info>,

    #[account(
        seeds=[b"favorites", user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,
}