const IPFS = require('ipfs-api');
const ipfs = new IPFS({host:'ipfs.infura.io', port:'5001', protocol: 'HTTPS'});

export default ipfs;