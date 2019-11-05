import express from 'express';
import rp from 'request-promise';
import render from './index';
import bodyParser from 'body-parser';

const port = 80;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static('dist'));

server.get('/', (req, res) => {
 const initialState = {
    image:"",
    title:"",
    fields: [],
    loadState:"",
    resultState:""
  };
  const {content,preState } = render(initialState);
  
  res.send(
    `<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
      <div id="root">${content}</div>
      <script>
        window.__STATE__ = ${JSON.stringify(preState)}
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>`
  );
});

server.post('/getDataForm', async (req, res) => {
 /* const options = {
    method: 'POST',
    uri: 'http://test.clevertec.ru/tt/meta',
    json: true
  };
  res.json(await rp.post(options));*/
  res.json({"title": "form",
            "image": "https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg",
            "fields": [
            {"title": "Привет",
             "name": "in1",
              "type": "TEXT"},
             {"title": "Привет2",
                "name": "in2",
                 "type": "NUMERIC"},
             {"title": "Привет3",
                "name": "in3",
                "type": "LIST",
                "values": {"none": "Не выбрано",
                    "v1": "Первое значение",
                    "v2": "Второе значение",
                    "v3": "Третье значение"}
                  }
                ]
            })
});

server.put('/putFormValue', async (req, res) => setTimeout(async() => {
 /*const options = {
    method: 'POST',
    uri: 'http://test.clevertec.ru/tt/data',
    body: {
      form : req.body
    },
    json: true
  };
  res.json(await rp.post(options))*/
  console.log(req.body)
  res.json({"result": "OK"})
}, 5000));


server.listen(port);
