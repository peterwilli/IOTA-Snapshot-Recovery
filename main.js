var IOTA = require('iota.lib.js');
var fs = require("fs")
var iota = new IOTA({
  'provider': 'http://node01.iotameetup.nl:14265'
});
var seed =  process.argv[2] + "" // in case the seed is all 9's (GOSH I HOPE NOT)
var snapshotSep = fs.readFileSync('snapshot_september.txt').toString().split("\n");
var snapshotOct = fs.readFileSync('snapshot_october.txt').toString().split("\n");


if (seed.length !== 81) {
  console.log("Seed is not 81 characters! Please reload the page and try again.");
}


document.getElementById("log").innerHTML += '\n Checking...'
var addressesWithBalances = []

var totalBalance = 0
var check = (index) => {
  document.getElementById("log").innerHTML += '\n Checking for new addresses'
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
        var balance = 0
        var reason = ""
        if(hitSep.length > 0){
          snapshotDate = "September 22"
          balance = parseInt(snapshotSep[snapshotSep.indexOf(hitSep[0])].split(',"balance":')[1])
          reason = snapshotSep[snapshotSep.indexOf(hitSep[0])].split(',"category":')[1]
        }
        if(hitOct.length > 0){
          snapshotDate = "October 23"
          balance = parseInt(snapshotOct[snapshotOct.indexOf(hitOct[0])].split("; ")[1])
          reason = snapshotOct[snapshotOct.indexOf(hitOct[0])].split(`${balance}; `)[1]
        }

        var convertedBalance = balance / 1000000
        document.getElementById("log").innerHTML += `\n Got a hit! ${addr} has a balance of ${convertedBalance} Mi which was found in the snapshot taken on ${snapshotDate}. The reason was ${reason}`
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
      setTimeout(function() {
        check(index + amountToScan)
      }, 100)
    }
    })
  }

check(0)
