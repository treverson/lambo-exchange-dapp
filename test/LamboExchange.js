let LamboExchange = artifacts.require('./contracts/LamboExchange.sol');

contract('LamboExchange', function(accounts) {

    let instance;
    let tokensCount;
    let owner = accounts[0];

    let tokenSymbol1 = "QSP";
    let tokenName1 = "Quanstamp Token";
    let tokenAddress1 = "0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d";

    let tokenSymbol2 = "REQ";
    let tokenName2 = "Request Network Token";
    let tokenAddress2 = "0x8f8221afbb33998d8584a2b05749ba73c37a938a";

    // Test case: check initial values after contract is deployed
    it(" ---> token count should be 0 when contract is first deployed", async function() {
        instance = await LamboExchange.deployed();
        tokensCount = await instance.tokensCount.call();
        assert.equal(tokensCount, 0, 'tokensCount should be 0');
    });

    // 1. Add a new token
    // 2. Verify the token count is correct
    // 3. Verify the token details are correctly saved
    // 3. Verify hasToken works correctly
    it(" ---> token should be successfully added and hasToken should correctly work", async function() {

        instance = await LamboExchange.deployed();

        await instance.addToken(tokenSymbol1, tokenName1, tokenAddress1, {
            from: owner
        });
        tokensCount = await instance.tokensCount.call();
        assert.equal(tokensCount, 1, 'tokensCount should be 0');

        let hasToken = await instance.hasToken.call(tokenSymbol1);
        assert.equal(hasToken, true, 'hasToken should be true for ' + tokenSymbol1);

        hasToken = await instance.hasToken.call("FOO");
        assert.equal(hasToken, false, 'hasToken should be true for FOO');

    });
    /*
        // Test case: list the 1st item
        // 1. List a new item
        // 2. Verify the receipt and confirm the event was correctly logged
        // 3. Verify how many items are there now
        // 4. Verify how many items are there now on sale
        // 5. Verify the details for the items on sale
        it(" ---> should let us list 1st item", function() {
            return Craigslist.deployed().then(function(instance) {
                contractInstance = instance;
                return contractInstance.listItem(name1, desc1, web3.toWei(price1, "ether"), {
                    from: seller
                });
            }).then(function(receipt) {
                assert.equal(receipt.logs.length, 1, 'only 1 event should be triggered');
                assert.equal(receipt.logs[0].event, 'itemListedEvent', 'event name should be itemListedEvent');
                assert.equal(receipt.logs[0].args._id, 1, 'event should log the id as 1');
                assert.equal(receipt.logs[0].args._seller, seller, 'event should log the seller as ' + seller);
                assert.equal(receipt.logs[0].args._name, name1, 'event should log the name as ' + name1);
                assert.equal(web3.fromWei(receipt.logs[0].args._price.toNumber(), "ether"), price1, 'event should log the price as ' + price1);
                assert.equal(receipt.logs[0].args._status, statusAfterListing, 'event should log the status as ' + statusAfterListing);
                return contractInstance.getItemCount.call();
            }).then(function(data) {
                assert.equal(data, 1, 'itemCount should be 1');
                return contractInstance.getItemsOnSale.call();
            }).then(function(data) {
                assert.equal(data.length, 1, 'there should be 1 item for sale');
                assert.equal(data[0].toNumber(), 1, 'item for sale should have the item id as 1');
                return contractInstance.items.call(data[0].toNumber());
            }).then(function(data) {
                assert.equal(data[0].toNumber(), 1, 'item id should be 1');
                assert.equal(data[1], seller, 'item seller address should be ' + seller);
                assert.equal(data[2], 0x0, 'item buyer address should be empty');
                assert.equal(data[3], name1, 'item name should be ' + name1);
                assert.equal(data[4], desc1, 'item desc should be ' + desc1);
                assert.equal(web3.fromWei(data[5].toNumber(), "ether"), price1, 'price should be ' + price1);
                assert.equal(data[6], statusAfterListing, 'item status should be ' + statusAfterListing);
                return contractInstance.itemBoughtCount.call();
            }).then(function(data) {
                assert.equal(data, 0, 'items bought should be 0');
            });
        });

        // Test case: list the 2nd item
        // 1. List a 2nd item (1st is already in our contract from previous test)
        // 2. Verify the receipt and confirm the event was correctly logged
        // 3. Verify how many items are there now
        // 4. Verify how many items are there now on sale
        // 5. Verify the details for the items on sale
        it(" ---> should let us list 2nd item", function() {
            return Craigslist.deployed().then(function(instance) {
                contractInstance = instance;
                return contractInstance.listItem(name2, desc2, web3.toWei(price2, "ether"), {
                    from: seller
                });
            }).then(function(receipt) {
                assert.equal(receipt.logs.length, 1, 'only 1 event should be triggered');
                assert.equal(receipt.logs[0].event, 'itemListedEvent', 'event name should be itemListedEvent');
                assert.equal(receipt.logs[0].args._id, 2, 'event should log the id as 2');
                assert.equal(receipt.logs[0].args._seller, seller, 'event should log the seller as ' + seller);
                assert.equal(receipt.logs[0].args._name, name2, 'event should log the name as ' + name2);
                assert.equal(web3.fromWei(receipt.logs[0].args._price.toNumber(), "ether"), price2, 'event should log the price as ' + price2);
                return contractInstance.getItemCount.call();
            }).then(function(data) {
                assert.equal(data, 2, 'itemCount should be 2');
                return contractInstance.getItemsOnSale.call();
            }).then(function(data) {
                assert.equal(data.length, 2, 'there should be 2 items for sale');
                assert.equal(data[1].toNumber(), 2, 'new item listed for sale should have the item id as 2');
                return contractInstance.items.call(data[1].toNumber());
            }).then(function(data) {
                assert.equal(data[0].toNumber(), 2, 'item id should be 2');
                assert.equal(data[1], seller, 'item seller address should be ' + seller);
                assert.equal(data[2], 0x0, 'item buyer address should be empty');
                assert.equal(data[3], name2, 'item name should be ' + name2);
                assert.equal(data[4], desc2, 'item desc should be ' + desc2);
                assert.equal(web3.fromWei(data[5].toNumber(), "ether"), price2, 'price should be ' + price2);
                assert.equal(data[6], statusAfterListing, 'item status should be ' + statusAfterListing);
                return contractInstance.itemBoughtCount.call();
            }).then(function(data) {
                assert.equal(data, 0, 'items bought should be 0');
            });
        });

        /*
        //
        // // itemListedEvent test the wrong way
        // Using itemListedEventWatcher.get() works relaibly only on testrpc since it is in-mem and very fast
        // On actual blockchain (private, test, main, etc.) this does not work reliably 
        // This is because we are actually querying the events by using .get()
        // Ideally, we should be looking for the response from blockchain when initiating the txn
        // Thats exactly what we'll do below
        //
        var itemListedEventWatcher;
        it("should trigger an event when a new item is listed", function() {
            return Craigslist.deployed().then(function(instance) {
                contractInstance = instance;
                itemListedEventWatcher = instance.itemListedEvent();
                return contractInstance.listItem(name, desc, web3.toWei(price, "ether"), {
                    from: seller
                });
            }).then(function() {
                // BAD
                return itemListedEventWatcher.get();
            }).then(function(events) {
                assert.equal(events.length, 1, 'only 1 event should be triggered')
                assert.equal(events[0].args._seller, seller, 'event should log the seller as ' + seller);
                assert.equal(events[0].args._name, name, 'event should log the name as ' + name);
                assert.equal(web3.fromWei(events[0].args._price.toNumber(), "ether"), price, 'event should log the price as ' + price);
            });
        });
        */
    /*
        // Test case: buy the 1st item
        // 1. Buy the 1st item
        // 2. Verify the receipt and confirm the event was correctly logged
        // 3. Verify the before/after balance for seller and buyer
        // 3. Verify how many items are there now
        // 4. Verify how many items are there now on sale
        // 5. Verify the details for the items on sale
        it(" ---> should let us buy the 1st item", function() {
            return Craigslist.deployed().then(function(instance) {
                contractInstance = instance;

                // balances before buy
                sellerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(seller), "ether").toNumber();
                buyerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(buyer), "ether").toNumber();

                return contractInstance.buyItem(1, {
                    from: buyer,
                    value: web3.toWei(price1, "ether")
                });
            }).then(function(receipt) {
                assert.equal(receipt.logs.length, 1, 'only 1 event should be triggered');
                assert.equal(receipt.logs[0].event, 'itemBoughtEvent', 'event name should be itemBoughtEvent');
                assert.equal(receipt.logs[0].args._seller, seller, 'item seller address should be ' + seller);
                assert.equal(receipt.logs[0].args._buyer, buyer, 'item buyer address should be ' + buyer);
                assert.equal(receipt.logs[0].args._name, name1, 'item name should be ' + name1);
                assert.equal(web3.fromWei(receipt.logs[0].args._price.toNumber(), "ether"), price1, 'price should be ' + price1);

                // balances after buy and verify money transfer happened
                // buyerBalanceAfterBuy is checking for less than equal to because buyer would pay for gas too
                sellerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(seller), "ether").toNumber();
                buyerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(buyer), "ether").toNumber();
                assert(sellerBalanceAfterBuy == sellerBalanceBeforeBuy + price1, 'seller should have earned ' + price1 + ' ETH');
                assert(buyerBalanceAfterBuy <= buyerBalanceBeforeBuy - price1, 'buyer should have spent ' + price1 + ' ETH');

                return contractInstance.items.call(1);
            }).then(function(data) {
                assert.equal(data[0].toNumber(), 1, 'item id 1');
                assert.equal(data[1], seller, 'item seller address should be ' + seller);
                assert.equal(data[2], buyer, 'item buyer address should be ' + buyer);
                assert.equal(data[3], name1, 'item name should be ' + name1);
                assert.equal(data[4], desc1, 'item desc should be ' + desc1);
                assert.equal(web3.fromWei(data[5].toNumber(), "ether"), price1, 'price should be ' + price1);
                assert.equal(data[6], statusAfterBuying, 'item status should be ' + statusAfterBuying);
                return contractInstance.getItemsOnSale.call();
            }).then(function(data) {
                assert.equal(data.length, 1, 'there should be 1 item for sale');
                assert.equal(data[0].toNumber(), 2, 'item for sale should have the item id as 2');
                return contractInstance.itemBoughtCount.call();
            }).then(function(data) {
                assert.equal(data, 1, 'items bought should be 1');
            });
        });
    */
});