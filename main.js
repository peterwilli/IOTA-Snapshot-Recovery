var IOTA = require('iota.lib.js');
var fs = require("fs")
var iota = new IOTA({
  'provider': 'http://node01.iotameetup.nl:14265'
});
var seed = process.argv[2] + "" // in case the seed is all 9's (GOSH I HOPE NOT)
var status = 'checking'
var snapshotSep = fs.readFileSync('snapshot_september.txt').toString().split("\n");
var snapshotOct = fs.readFileSync('snapshot_october.txt').toString().split("\n");

if (seed.length !== 81) {
  console.error("Seed is not 81 characters!")
  return
}


console.log('Checking...');
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
      var hitSep = snapshotSep.filter((s) => {
        return s.indexOf(addr) > -1
      })
      var hitOct = snapshotOct.filter((s) => {
        return s.indexOf(addr) > -1
      })

      if (hitSep.length > 0 || hitOct.length > 0) {
        var snapshotDate = ""
        if(hitSep.length > 0){
          snapshotDate = "September 22"
          var balance = parseInt(snapshotSep[snapshotSep.indexOf(hitSep[0])].split(',"balance":')[1])
        }
        if(hitOct.length > 0){
          snapshotDate = "October 23"
          var balance = parseInt(snapshotOct[snapshotOct.indexOf(hitOct[0])].split("; ")[1])
        }

        var convertedBalance = balance / 1000000
        console.log(`Got a hit! ${addr} has a balance of ${convertedBalance} which was found in the
          snapshot taken on ${snapshotDate}. The reason was `)
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
    }
  })
}
})
}

check(0)
