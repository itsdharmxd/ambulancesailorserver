const tokenParse = (body) => {
    body.latitude = parseFloat(body.latitude).toFixed(4);
    body.longitude = parseFloat(body.longitude).toFixed(4);

    return body;
}

module.exports = {
    tokenParse
}