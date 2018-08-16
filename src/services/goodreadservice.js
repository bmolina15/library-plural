const axios = require('axios');
const xml2js = require('xml2js');
const parser = xml2js.Parser({ explicitArray: false });

function goodreadservice() {

    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get('https://www.goodreads.com/book/show/50.xml?key=TPHW7wJyTtM36CuCTbh5w')
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) {

                        } else {
                            resolve(result.GoodreadsResponse.book)
                        }
                    })
                })
        
            .catch((error) => {
                reject(error);
            });

    });
}
return { getBookById }
}

module.exports = goodreadservice();

