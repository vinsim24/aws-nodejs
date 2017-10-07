import * as rt53 from './aws/Route53'

//const hostedZoneId='';
//const DNS_RECORD_TYPE_CNAME="CNAME";
//const DNS_RECORD_TYPE_A="A";


console.log("Command Line Args::"+JSON.stringify(process.argv));
var args = process.argv.slice(2);

let hostedZoneId = args[0];
let dnsRecordType = args[1];

rt53.prepareChangeResourceRecordSets(hostedZoneId,dnsRecordType,(changeResourceRecordSets) => {
    console.log("ChangeResourceRecordSets::"+ JSON.stringify(changeResourceRecordSets));
});