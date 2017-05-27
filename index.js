#!/usr/bin/env node

const app = require('express')();
const dump = require('express-dump');

const port = process.env.PORT || 5000;

const { middleware, dump: flush } = dump({path: `${__dirname}/dump`});

app.use(middleware);

app.listen(port);
console.log(`Collecting logs on port ${port}. Press ^C to shutdown and dump.`);

process.on('SIGINT', function() {
    console.log('Dumping...');
    flush()
        .then(() => console.log('Have a nice day!'))
        .catch(err => console.error('Could not dump: ', err))
        .then(() => process.exit());
});
