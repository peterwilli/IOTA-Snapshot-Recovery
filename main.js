var IOTA = require('iota.lib.js');
var fs = require("fs")
var iota = new IOTA({
  'provider': 'http://node01.iotameetup.nl:14265'
});
var seed = process.argv[2] + "" // in case the seed is all 9's (GOSH I HOPE NOT)
var depositSeed = process.argv[3] + ""
var status = 'checking'
var snapshot = fs.readFileSync('snapshot_validation_20171023.txt').toString().split("\n");

if (seed.length !== 81) {
  console.error("Seed is not 81 characters!")
  return
}

if (depositSeed.length !== 81) {
  console.error("Deposit Seed is not 81 characters!")
  return
}

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if (key.name === 'i') {
      status = 'making_tx'
    }
  }
})

console.log('Scanning now against snapshot... Just let it run until no new transactions are found. Press i to transfer your money to a new address from the same seed.');
var addressesWithBalances = []

var totalBalance = 0
var check = (index) => {
  console.log('Checking for new addresses');
  const amountToScan = 2
  var f = iota.api.getNewAddress(seed, {
    index,
    total: amountToScan,
    checksum: false
  }, function(e, d) {
    var hits = 0
    for (var i = 0; i < d.length; i++) {
      var addr = d[i]
      var hit = snapshot.filter((s) => {
        return s.indexOf(addr) > -1
      })
      if (hit.length > 0) {
        console.log(`Got a hit! ${addr}`)
        var balance = parseInt(snapshot[snapshot.indexOf(hit[0])].split("; ")[1])
        totalBalance += balance
        addressesWithBalances.push({
          address: addr,
          balance,
          keyIndex: index + i,
          security: 2
        })
        hits++
      }
    }
    if (status === 'checking') {
      // To make sure we don't get stuck in 1 process (and make sure keypress event triggers)
      setTimeout(function() {
        check(index + amountToScan)
      }, 100)
    } else {
      var f = iota.api.getNewAddress(depositSeed, {
        index: 0,
        total: 2,
        checksum: false
      }, function(e, d) {
        var depositAddr = d[0]
        if(depositAddr.length === 81) {
          var outputs = [{
            'address': depositAddr,
            'value': totalBalance
          }]
          console.log(`Done, creating final transfer...`);
          iota.api.prepareTransfers(seed, outputs, {
            'inputs': addressesWithBalances
          },
          function(e, s) {
            console.log(outputs, addressesWithBalances, e, s);
            console.log(`Sending money to ${depositAddr}...`);
            iota.api.sendTrytes(s, 2, 14, (e, r) => {
              console.log(e, r, "\nSent!");
            })
          })
        }
        else {
          console.error('Deposit address generation failed! No money has been sent.');
        }
      })
    }
  })
}

check(6)
