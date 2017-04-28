import pusage from 'pidusage'

pusage.stat(process.pid, function(err, stat) {

  console.log(stat)
  console.log('Pcpu: %s', stat.cpu)
  console.log('Mem: %s', stat.memory) //those are bytes

})

setInterval(function () {
  pusage.stat(process.pid, function(err, stat) {
    console.log(stat)
    console.log('Pcpu: %s', stat.cpu)
    console.log('Mem: %s', stat.memory) //those are bytes
  })
}, 5000)
