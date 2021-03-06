
// Budget controller
var budgetController= (function(){
  // some code 
var Expense = function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
    this.percentage=-1;
};
    
    Expense.prototype.calcPercentage=function(totalIncome){
        if(totalIncome>0){
        this.percentage=Math.round((this.value/totalIncome)*100);
        }
        else{
        this.percentage=-1;
        }
    };
    
    Expense.prototype.getPercentage=function(){
        return this.percentage
    }

var Income= function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
    
};
    
var calculateTotal = function(type){
   var sum = 0;
    data.allItems[type].forEach(function(cur){
        sum=sum+cur.value;
    });
    data.total[type]=sum;
};
var data={
    allItems:{
        exp:[],
        inc:[]
    },
    total:{
        exp:0,
        inc:0
        },
    budget:0,
    percentage:-1,
    
};

return{
    addItem: function(type,des,val){
        var newItem, ID;
        
        if(data.allItems[type].length>0){
        ID=data.allItems[type][data.allItems[type].length-1].id+1;
        }
        else{
            ID=0;
        }
        
        if(type==='exp'){
        newItem =new Expense(ID,des,val);
        }
        else if(type==='inc'){
            newItem =new Expense(ID,des,val);
        }
        
        data.allItems[type].push(newItem);
        return newItem;
        
        data.allItems[type].push(newItem);
        return newItem;
    },
    
    deleteItem: function(type,id){
        // id=3
        var ids,index;
        console.log(type);
        
ids=data.allItems[type].map(function(current){
    return current.id
});
                               
        
        index=ids.indexOf(id);
        if(index!==-1){
            data.allItems[type].splice(index,1);
        }
    },
    
    calculateBudget: function(){
        // caculate total income and expenese 
        calculateTotal('exp');
        calculateTotal('inc');
        // calculate the budget income- expenss 
        data.budget=data.total.inc-data.total.exp;
        // calculate the percentage of income that we spent
        if(data.total.inc>0){
        data.percentage=data.total.exp/data.total.inc*100;
        }
        else {
            data.percentage=-1;
        }
    },
    
    calculatePercentages: function(){
    data.allItems.exp.forEach(function(cur){
    cur.calcPercentage(data.total.inc);
});
},
    
    getPercentages: function(){
        var allPerc=data.allItems.exp.map(function(cur){
            return cur.getPercentage();
        });
        return allPerc;
    },
                
    
    
getBudget: function(){
       return{
           budget: data.budget,
           totalInc:data.total.inc,
           totalExp:data.total.exp,
           percentage:data.percentage
       } 
    },
    testing: function(){
        console.log(data);
    }
}
}
)();


//UI Controller
var UIController=(function(){
    
        var DOMItems={
            inputType:'.add__type',
            inputValue:'.add__value',
            inputDescription:'.add__description',
            inputBtn:'.add__btn',
            incomeContainer:'.income__list',
            expenseContainer:'.expenses__list',
            budgetLabel:'.budget__value',
            incomeLabel:'.budget__income--value',
            expensesLabel:'.budget__expenses--value',
            percentageLabel:'.budget__expenses--percentage',
            container:'.container',
            expensesPercLabel:'.item__percentage'
            
    };
    
    return{
        getInput:function(){
            return{
                type:document.querySelector(DOMItems.inputType).value,
                description:document.querySelector(DOMItems.inputDescription).value,
                value: parseFloat(document.querySelector(DOMItems.inputValue).value)
            };
            
            
        },
        
        
        addListItem: function(obj,type) {
var html, newHtml, element 
            if (type==='inc'){
                element=DOMItems.incomeContainer;
                
html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'; 
            }
            else if (type==='exp'){
                element=DOMItems.expenseContainer;
html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace place holder text with soe actrual text
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%description%', obj.description);
            newHtml=newHtml.replace('%value%',obj.value);
            
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        deleteListItem: function(selectorID){
            var el=document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        clearFields: function(){
            var fields, fieldsarr;
          fields= document.querySelectorAll(DOMItems.inputDescription+','+DOMItems.inputValue); 
            
        fieldsArr=Array.prototype.slice.call(fields);
            
        fieldsArr.forEach(function(current,index,array){
            current.value="";
            
        });
           fieldsArr[0].focus(); 
        },
        displayBudget: function(obj){
           document.querySelector(DOMItems.budgetLabel).textContent=obj.budget; 
 document.querySelector(DOMItems.incomeLabel).textContent=obj.totalInc; 
 document.querySelector(DOMItems.expensesLabel).textContent=obj.totalExp; 
 document.querySelector(DOMItems.percentageLabel).textContent=obj.percentage; 
            
            if(obj.percentage>0){
                document.querySelector(DOMItems.percentageLabel).textContent=obj.percentage+'%'; 
  
            }
            else{
                document.querySelector(DOMItems.percentageLabel).textContent='---'; 
  
            }
       
         },
        displayPercentages: function(percentages){
            var fields=document.querySelectorAll(DOMItems.expensesPercLabel);
            
            
            var nodeListForEach=function(list,callback){
                for(var i=0;i<list.length;i++){
                    callback(list[i],i);
                }
            }
            nodeListForEach(fields,function(current,index){
                if(percentages[index]>0){
                current.textContent=percentages[index]+'%';}
                else{current.textContent='---'}
                
            });
        },
        
        getDOMStrings: function(){
            return DOMItems;
        }
    }
    
})();


//Global App Controller
var controller=(function(budgetCtrl,UICtrl){
    
var setupEventListeners=function(){
       var DOM=UICtrl.getDOMStrings();
    
document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

document.addEventListener('keypress',function(event){
        if(event.keyCode===13||event.which===13){
        ctrlAddItem();
      
        }
    });
document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem)
}
 
var UpdateBudget=function(){
    //1. calculate the budget
    budgetCtrl.calculateBudget();
    //2. return the budget 
    var budget=budgetCtrl.getBudget();
    //3. Display the budget on the UI
UICtrl.displayBudget(budget);
};
    
var updatePercentages=function(){
    //1. Calculate percentages
    budgetCtrl.calculatePercentages();
    //2. Read Percentages from the budget controller
    var percentages=budgetCtrl.getPercentages();
    console.log(percentages);
    //3 Update the UO with the new percentages 
    UICtrl.displayPercentages(percentages);
};
    
var ctrlAddItem=function(){
    var input, newItem
     //1. get the field input data
    input=UICtrl.getInput();
    
    if(input.description!=="" && !isNaN(input.value)&&input.value>0){
         newItem= budgetCtrl.addItem(input.type,input.description,input.value);
    
    //3. add the item to the I 
    UICtrl.addListItem(newItem,input.type);
    
    //4. Clear the fields;
    UICtrl.clearFields();
    
    //.5 Clculate and update budget 
    UpdateBudget();
        
    //6. Calculate and Update percentages 
        
        updatePercentages();
    }
    
    //2 add item to the budget controler
   
};
    var ctrlDeleteItem =function(event){
        var itemID,type,ID,splitID
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);
        if (itemID){
            //inc-1
            splitID=itemID.split('-');
            type=splitID[0];
            ID=parseInt(splitID[1]);
            
            //1. delete the item from the data structure]
            
            budgetCtrl.deleteItem(type,ID);
            //2. Delete the item
            UICtrl.deleteListItem(itemID);
            //3. Update and show the new budget 
            UpdateBudget();
            
             //6. Calculate and Update percentages 
        
        updatePercentages();
        }
    }
    
return{
    init: function(){
console.log('Application has started ');
UICtrl.displayBudget({budget: 0,
           totalInc:0,
           totalExp:0,
           percentage:-1});
setupEventListeners();}
}
})(budgetController,UIController);
    
    controller.init();