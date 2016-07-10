var Agenda =  require('agenda');

var agenda = new Agenda({db: {address: 'mongodb://localhost/topupet_dev', collection: 'jobs'}});

  agenda.on('error',function(error){
    console.log(error);
  });

  agenda.on('start', function(job) {
  console.log("Job %s starting", job.attrs.name);
});
require('./jobs/email')(agenda);

agenda.on('ready',function(){ 
    console.log('agenda ready');               
    agenda.start();
  });

function graceful() {
  agenda.stop(function() {
    process.exit(0);
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);


module.exports = agenda;



