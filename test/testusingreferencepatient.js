var TestPatient = artifacts.require('./TestUsingReferencePatient.sol');
contract('TestUsingReferencePatient:Test', function(accounts) {  
    it("should return a correct string", function(done) {   
         var hello_eth_salon = TestPatient.deployed();    
         hello_eth_salon.then(function(contract){      
             return contract.Test.call(); // **IMPORTANT    
            }).then(function(result){      
                 assert.isTrue(result === 'Hello Ethereum Salon!');     
                  done();    
                })  
            });   
        });