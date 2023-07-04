import QRCode from "qrcode";

export async function qrCodeGenerator(id) {
  try {
    let data = "http://yummy/event?event=" + id;

    let stJson = JSON.stringify(data);
    // QRCode.toString(stJson,{type:"terminal"},function(err,code){
    //     if(err) return console.log("error")
    //     console.log(code)
    // });
    var path = "generated/qrCode/" + id + ".png";
    await QRCode.toFile(path, stJson);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}