use anchor_lang::prelude::*;

declare_id!("HhQUdUs3NXAgUu8oB3B2SGQ31PYkJrgN8m4v5Af1rX58");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
