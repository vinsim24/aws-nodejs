import AWS from "aws-sdk"

let route53 = new AWS.Route53();
const UPSERT="UPSERT";


export function listHostedZones(next){
    let params="";
    route53.listHostedZones(params,(err,data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            // successful response
            console.log(data);
            next(data);
        }
    })
}

export function listResourceRecordSets(hostedZoneId,next) {
    let params = {
        HostedZoneId: hostedZoneId /* required */
    };
    route53.listResourceRecordSets(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            // successful response
            console.log("listResourceRecordSets::"+JSON.stringify(data));
            next(data)
        }

    });
}

export function prepareChangeResourceRecordSets(hostedZoneId,dnsRecordType,next) {
    let changeResourceRecordSets={};
    listResourceRecordSets(hostedZoneId,(data) => {
        changeResourceRecordSets.Changes=[];
        let resourceRecordSets = data.ResourceRecordSets;
        resourceRecordSets.forEach((resourceRecordSet) => {
            //if(resourceRecordSet.Type === DNS_RECORD_TYPE_CNAME || resourceRecordSet.Type === DNS_RECORD_TYPE_A ) {
            if(resourceRecordSet.Type === dnsRecordType){
                let newObj = {};
                newObj.Action = UPSERT;
                newObj.ResourceRecordSet = resourceRecordSet;
                changeResourceRecordSets.Changes.push(newObj);
            }
        });
        next(changeResourceRecordSets)
    });
}

