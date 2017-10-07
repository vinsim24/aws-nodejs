import * as rt53 from './aws/Route53'

//const hostedZoneId='';
//const DNS_RECORD_TYPE_CNAME="CNAME";
//const DNS_RECORD_TYPE_A="A";

var args = process.argv.slice(2);

if(args.length < 3){
    console.log("Usage::node index.js \"<Hosted Zone Id>\" \"DNS Record Type\" \"DNS Action\"\n" +
        "    e.g., node index.js \"AHJFHJ89989SHD\" \"A\" \"UPSERT\"\n" +
        "          node index.js \"AHJFHJ89989SHD\" \"CNAME\" \"UPSERT\"");
    process.exit(1);
}

console.log("Command Line Args::"+JSON.stringify(process.argv));

let hostedZoneId = args[0];
let dnsRecordType = args[1];
let dnsAction = args[2];

rt53.prepareChangeResourceRecordSets(hostedZoneId,dnsRecordType,dnsAction,(changeResourceRecordSets) => {
    console.log("ChangeResourceRecordSets::"+ JSON.stringify(changeResourceRecordSets));
});