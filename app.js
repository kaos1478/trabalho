const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const takeBiggest = (counter) => Math.max.apply(null, counter)
const ondenation = (a, b) => a - b
const ondenationMaker = (arr, ondenation) => arr.sort(ondenation)
const map = (name) => {
  return {count: 1, name: name}
}
const reduce = (a, b) => {
  a[b.name] = (a[b.name] || 0) + b.count
  return a
}
const mapToArray = (score) => {
  const counter = []
  Object.keys(score).filter((a) => {
    counter.push(score[a])
  })
  return counter
}
const filterMap = (score, MAX) => Object.keys(score).filter((a) => {
  return (score[a] === MAX) ? score[a] : null
})

function moda(arr) {
  const done =  ondenationMaker(arr, ondenation)
  let score = done.map(map).reduce(reduce, {}) 
  const counter = mapToArray(score)
  const MAX = takeBiggest(counter) 
  return filterMap(score, MAX)
}

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Calculator API",
            description: "Bruno Henrique Ramos da Silva (N154CD4)",
            contact: {
                name: "Bruno Henrique Ramos da Silva"
            },
            servers: ["https://trabalho-robson-backend.herokuapp.com/"]
        }
    },
        // ['.routes/*.js']
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors())
app.use(express.json());

// Routes
/**
 * @swagger
 * /sum:
 *  get:
 *    description: Use to request a sum
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: Second value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/sum", (req, res) => {
    const {value1, value2} = req.query
    const result = Number(value1) + Number(value2);
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "result": result, "expression": value1 + "+" + value1 + ' = ' + result});
});

/**
 * @swagger
 * /subtraction:
 *  get:
 *    description: Use to request a subtraction
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: Second value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/subtraction", (req, res) => {
    const {value1, value2} = req.query
    const result = Number(value1) - Number(value2);
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "result": result, "expression": value1 + "-" + value1 + ' = ' + result});
});

/**
 * @swagger
 * /division:
 *  get:
 *    description: Use to request a division
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: Second value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/division", (req, res) => {
    const {value1, value2} = req.query
    const result = Number(value1) / Number(value2);
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "result": result, "expression": value1 + "/" + value1 + ' = ' + result});
});

/**
 * @swagger
 * /multiplication:
 *  get:
 *    description: Use to request a multiplication
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: Second value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/multiplication", (req, res) => {
    const {value1, value2} = req.query
    const result = Number(value1) * Number(value2);
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "result": result, "expression": value1 + "*" + value1 + ' = ' + result});
});

/**
 * @swagger
 * /squareroot:
 *  get:
 *    description: Use to request a square root
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/squareroot", (req, res) => {
    const {value1} = req.query
    const result = Math.sqrt(Number(value1))
    res.status(200).json({"value1": Number(value1), "result": result, "expression": "V"+value1 + ' = ' + result});
});

/**
 * @swagger
 * /power:
 *  get:
 *    description: Use to request a power
 *    parameters:
 *      - name: base
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: exponent
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/power", (req, res) => {
    const {base, exponent} = req.query
    const result = Math.pow(Number(base), Number(exponent))
    res.status(200).json({"base": Number(base), "exponent": Number(exponent), "result": result, "expression": base + "^" + exponent + ' = ' + result});
});

/**
 * @swagger
 * /arithmeticaverage:
 *  get:
 *    description: Use to request a arithmetic average
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value3
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/arithmeticaverage", (req, res) => {
    const {value1, value2, value3} = req.query
    const result = Number(value1)+Number(value2)+Number(value3)/3
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "value3": Number(value3) , "result": result, "expression": value1 + "+" + value2 + "+" + value3 + "/3" + ' = ' + result});
});

/**
 * @swagger
 * /harmonicmean:
 *  get:
 *    description: Use to request a Harmonic mean
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value3
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/harmonicmean", (req, res) => {
    const {value1, value2, value3} = req.query
    const result = (3/((1/Number(value1))+(1/Number(value2))+(1/Number(value3))))
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "value3": Number(value3) , "result": result, "expression": "(3/((1/"+Number(value1)+")+(1/"+Number(value2)+")+(1/"+Number(value3)+"))) = " + result});
});

/**
 * @swagger
 * /moda:
 *  get:
 *    description: Use to request a Harmonic mean
 *    parameters:
 *      - name: value1
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value2
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: value3
 *        in: query
 *        description: First value
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/moda", (req, res) => {
    const {value1, value2, value3} = req.query
    const result = moda([Number(value1), Number(value2), Number(value3)])
    res.status(200).json({"value1": Number(value1), "value2": Number(value2), "value3": Number(value3) , "result": result, "expression": ""});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server running in port:"+port);
})

//(3/((1/numero1)+(1/numero2)+(1/numero3)))