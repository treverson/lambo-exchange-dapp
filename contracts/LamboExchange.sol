pragma solidity ^0.4.19;

contract LamboExchange {
    
    struct Offer {
        address who;
        uint amount;
    }
    
    struct OrderBook {
        
        // LinkedList to OrderBook themselves
        uint higherPrice;
        uint lowerPrice;
        
        // Stack of offers
        // offersKey points to current offer
        // offersLength tracks total available offers on stack
        mapping(uint => Offer) offers;
        uint offersKey;
        uint offersLength;
    }
    
    struct Token {
        
        // Basic info
        string tokenSymbol;
        string tokenName;
        address tokenAddress;
        
        // Price to OrderBook map
        mapping(uint => OrderBook) buyOrderBook;
        uint currentBuyPrice;
        uint lowestBuyPrice;
        
        mapping(uint => OrderBook) sellOrderBook;
        uint currentSellPrice;
        uint highestSellPrice;
    }
   
    //////////////////////
    // Exchange
    //////////////////////

    // All tokens supported by our exchange
    // We'll refer to each token via id
    mapping(uint => Token) public tokens;
    uint public tokensCount;
    
    // Ether balances
    mapping(address => uint) ethBalances;
    
    // Token balances
    // Each address can hold multiple tokens hence a map of a map
    // address to tokenSymbol to amount map
    mapping(address => mapping(string => uint)) tokenBalances;
    
    //////////////////////
    // Order Books
    //////////////////////
    
    function cancelOrder(string _tokenSymbol, bool _isBuyOrder, uint _offerKey) public returns (uint[], uint[]) {
        
    }
    
    function getSellOrderBook(string _tokenSymbol) public returns (uint[], uint[]) {
        
    }
    
    function getBuyOrderBook(string _tokenSymbol) public returns (uint[], uint[]) {
        
    }
    
    function buyToken(string _tokenSymbol, uint256 _amount, uint256 _price) public {
        
    }
    
    function sellToken(string _tokenSymbol, uint256 _amount, uint256 _price) public {
        
    }
    
    //////////////////////
    // Ether Management
    //////////////////////
    
    function depositEther() public payable {
        
    }
    
    function withdrawEther(uint256 _amount) public {
        
    }
    
    function getEtherBalance() public view returns (uint256) {
        
    }
    
    //////////////////////
    // Token Management
    //////////////////////
    
    function depositToken(string _tokenSymbol, uint256 _amount) public {
        
    }
    
    function withdrawToken(string _tokenSymbol, uint256 _amount) public {
        
    }
    
    function getTokenBalance(string _tokenSymbol) public view returns (uint256) {
        
    }
    
    //////////////////////
    // Admin
    //////////////////////
    
    function addToken(string _tokenSymbol, string _tokenName, address _tokenAddress) public {
        
        require(!hasToken(_tokenSymbol));
        
        Token memory t = Token({
                tokenSymbol: _tokenSymbol, 
                tokenName: _tokenName,
                tokenAddress: _tokenAddress,
                currentBuyPrice: 0,
                lowestBuyPrice: 0,
                currentSellPrice: 0,
                highestSellPrice: 0
            });
        tokensCount++;
        tokens[tokensCount] = t;
    }
    
    function hasToken(string _tokenSymbol) public view returns (bool) {
        
        // Remember our 1st token was added with id as 1
        for (uint i = 1; i <= tokensCount; i++) {
            if (keccak256(tokens[i].tokenSymbol) == keccak256(_tokenSymbol)) {
                return true;
            }
        }
        
        return false;
    }
}