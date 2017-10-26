# IOTA Snapshot Recovery Tool

Using this tool you can move all your funds from a seed that has been used pre-snapshot to a new seed, for fixing the zero-balance problem.

The tool is completely secure, you run it on your own PC without anything being sent to the internet (well, except for the final transaction)

## How to use?

- Simply clone this repo.
- Run `npm install` to get the final dependencies.
- In the directory, run `node main.js <old seed> <new seed>`.
- Sit back and watch as the tool will find balances that are linked to your old seed.
- When you think you have all your balances, you simply hit the `i`-key and the final transaction is being made.
