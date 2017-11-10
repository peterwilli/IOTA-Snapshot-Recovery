# IOTA Balance Finder

Using this tool you can find where your balances are after a snapshot and choose the appropriate action (reclaim, generate addresses, etc).

#### Please note that this tool will not work if you did not transition.

This is adapted from https://github.com/peterwilli/IOTA-Snapshot-Recovery

The tool is completely secure, you can run it on your own computer without anything being sent to the internet

## How to use?
Ensure you have the following:
- Git which you can download from https://git-scm.com/
- NodeJS which you can download from https://nodejs.org

Run the following commands in Terminal or PowerShell:
- `git clone https://github.com/rajivshah3/IOTA-Balance-Finder balance-finder`
- `cd balance-finder`
- `npm install`
- `node main.js <seed>` Make sure to remove the < and >!
- Sit back and watch as the tool will find balances that are linked to your seed.
- When you think you have all your balances, simply hit the `i`-key.

## What to do next
- If the tool says `The balance is currently in the address` to all addresses found, use https://github.com/peterwilli/IOTA-Snapshot-Recovery to quickly and easily transfer your balance to a new seed
- If the tool says `CURL_UNUSED`, `CURL_NOT_TRANSITIONED`, `KEY_REUSE`, or `KEY_REUSE_OCT` you must use the reclaim tool

## How it works

The repository has a snapshot txt file in itself, this snapshot, at the time of writing, is the latest. If there is a newer snapshot you should replace the file on this repo with the newest.

The tool will then generate many different addresses based on your seed, and compares locally with the snapshot file. If there is a hit (and assuming no money has been transferred after the snapshot period) the tool will alert you.

----

                                      .yNMmo           
                                     +MMMMM.          
              -+/` -yh+ .o+`          +hhy:           
             :MMMy /mNy +Nm-/dy `      ``.`           
              /ss.  `..   ` ./-:mo``  .dMMm: -shs-    
              .ydh- oMMs odh``-..`ho  .mNNN/ dMMMm    
        -yhy: :NNNo -ss- :s+`oNy./.    `::`  .oys-    
        hMMMN  .-.``   .-.  `.. :h/   :hdy.  -+/`     
        .+so:`   sdds -NMN.-mm+`::`   oNNm- -MMMh -++.
          `sddy. hNNh  /o: `/+..dd.  .-:-`  `/so.`NMMm
      ``  :NMMM/  ..    .`          -NMm.  +hh:   :oo-
    :hddy. -++:     -` /mh  PETER  `--/o/   smd/ /dd+  
    mMMMMy      ss -do `/+-  HI   +NN:  `yd+``  /dd+  
    :ydds.     -s: -yo  yMm`   `hh--- .:-sh/  yds``   
      ``       :y- -yo  `-://` `++`./.smo  ./-+y+     
               smo  odh`  dMM+     :y:``.+:+ds        
               .+/` :yo`  .:-.+o/     ys.s/ `         
                mNd   smm/   sMMM/    ``              
                .:::. +hh-`` `+o/ :ydh/               
                 .NMN-   /NNm-    hMMMm  .+o+.        
                  :+:`//./mNd- -/:.+s+. .NMMMN:       
                     mMMN.    yMMMm     `dMMMm.       
                     -ss/     /mMNo       .-.         
