var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set('myName', 'FangFeiyue', redis.print);
client.get('myName', (err, val) => {
  if (err) {
    console.log(err)
    return;
  }

  console.log('val', val);
  
  client.quit();
});