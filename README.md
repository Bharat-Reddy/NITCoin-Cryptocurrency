# NITCoin-Cryptocurrency

Install all the dependencies present in package.json
```
npm install
```
Run the server
```
npm start
```
Get blockchain
```
curl http://localhost:3001/blocks
```
Create block
```
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock
```
Add Peer
```
curl -H "Content-type:application/json" --data '{"peer" : "ws://localhost:6001"}' http://localhost:3001/addPeer
```
Query Connected peers
```
curl http://localhost:3001/peers
```
