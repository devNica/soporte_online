var router = require('express').Router();
var fs = require('fs-extra');
var puppeteer = require('puppeteer');
var seed = require('../seeds/seed');

router.get('/export/html/test', (req, res) => {
    let parts = seed.parts;
    let coverage = seed.coverage;
    let info = seed.info
    let tasks = seed.tasks
    res.render('reports/assistance', { parts, coverage, info, tasks });
})


//CUANDO ESTE EN PRODUCCION SERA UN POST
router.post('/export/html', (req, res) => {

    //console.log(req.body)

    res.render('reports/assistance',
        {
            parts: req.body.parts,
            coverage: req.body.coverage,
            info: req.body.info,
            tasks: req.body.tasksEQP,
            amount: req.body.amount
        }
    );

});

router.post('/export/pdf', (req, res) => {

    (async () => {

        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage()



            await page.setRequestInterception(true);
            page.on("request", interceptedRequest => {
                interceptedRequest.continue({
                    method: "POST",
                    postData: JSON.stringify(req.body.data),
                    headers: { "Content-Type": "application/json" },
                });
            });

            await page.goto('http://localhost:4200/api/export/html')
            await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 4 });
            const buffer = await page.pdf({ format: 'Letter', printBackground: true })

            //res.set('Content-type', 'application/pdf')
            res.send(buffer)
            browser.close();
            //process.exit();
        } catch (error) {
            console.log(error)
        }
    })();

});

module.exports = router;