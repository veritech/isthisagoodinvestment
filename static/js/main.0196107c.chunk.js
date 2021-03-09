(this.webpackJsonpyield=this.webpackJsonpyield||[]).push([[0],{169:function(e,t,a){e.exports=a(355)},174:function(e,t,a){},355:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(51),l=a.n(s),i=(a(174),a(15)),o=a(16),c=a(18),u=a(17),m=(a(84),a(8)),p=a(140),h=a.n(p),d=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state=e,n}return Object(o.a)(a,[{key:"formatValue",value:function(e){var t=e||this.state.value;return null==t?"":this.props.format?this.props.format(t):t.toString()}},{key:"parseValue",value:function(e){return this.props.parse&&e?this.props.parse(e):0}},{key:"valueDidChange",value:function(e){if(null==e.currentTarget.value){var t=this.parseValue(e.currentTarget.value);this.setState({value:t}),null!=this.props.onChange&&this.props.onChange(t)}}},{key:"render",value:function(){return r.a.createElement("div",{className:"row mb-sm-4 mb-md-0"},r.a.createElement("div",{className:"col-sm-auto col-md-12"},r.a.createElement("p",{className:"mb-0"},this.props.label)),r.a.createElement("div",{className:"col-sm-auto col-12"},r.a.createElement(h.a,{strict:!0,mobile:!0,min:this.props.min,max:this.props.max,step:this.props.step,precision:2,value:this.props.value,format:this.formatValue.bind(this),parse:this.parseValue.bind(this),onInput:this.valueDidChange.bind(this),readOnly:!!this.props.readonly})))}}]),a}(r.a.Component),y=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"dataSeries",value:function(e){var t=new Set([0,2,4,9,24]);return this.props.data.filter((function(e,a){return t.has(a)})).map((function(t,a){return e(t)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("table",{className:"table table-bordered table-sm"},r.a.createElement("tr",null,r.a.createElement("th",null,"Asset"),r.a.createElement("th",null,"Year 1"),r.a.createElement("th",null,"Year 3"),r.a.createElement("th",null,"Year 5"),r.a.createElement("th",null,"Year 10"),r.a.createElement("th",null,"Year 25")),r.a.createElement("tr",null,r.a.createElement("td",null,"Global Equity"),this.dataSeries((function(e){return e.globalEquity})).map((function(t){return r.a.createElement("td",null,e.props.format(t))}))),r.a.createElement("tr",null,r.a.createElement("td",null,"Gilts"),this.dataSeries((function(e){return e.gilts})).map((function(t){return r.a.createElement("td",null,e.props.format(t))}))),r.a.createElement("tr",null,r.a.createElement("td",null,"Property Equity"),this.dataSeries((function(e){return e.propertyEquity})).map((function(t){return r.a.createElement("td",null,e.props.format(t))}))),r.a.createElement("tr",null,r.a.createElement("td",null,"Property Income"),this.dataSeries((function(e){return e.propertyRetainedEarnings})).map((function(t){return r.a.createElement("td",null,e.props.format(t))}))))}}]),a}(r.a.Component),E=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"percentFormat",value:function(e){return this.props.percentFormat?this.props.percentFormat(e):e.toString()}},{key:"currencyFormat",value:function(e){return this.props.currencyFormat?this.props.currencyFormat(e):e.toString()}},{key:"render",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12 col-md-4"},r.a.createElement("h4",null,"Buy to Let"),r.a.createElement("p",null,"This prospective investment has:"),r.a.createElement("ul",null,r.a.createElement("li",null,"ROI of ",r.a.createElement("strong",null,this.percentFormat(this.props.roi))," (annual return/ initial investment)"),r.a.createElement("li",null,"Gross yield of ",r.a.createElement("strong",null,this.percentFormat(this.props.grossYield))),r.a.createElement("li",null,"Net yield of ",r.a.createElement("strong",null,this.percentFormat(this.props.netYield)))),r.a.createElement("p",null,"It would generate ",r.a.createElement("strong",null,this.currencyFormat(this.props.annualIncomeAfterExpenses),"/year"),", or ",r.a.createElement("strong",null,this.currencyFormat(this.props.annualIncomeAfterExpenses/12),"/month")," in profits"),r.a.createElement("p",null,"This model doesn't account for:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("strong",null,"Tax")),r.a.createElement("li",null,"Periodic remortgaging costs"),r.a.createElement("li",null,"Periodic agent letting fees (eg. First months rent)"),r.a.createElement("li",null,"Rental Voids"),r.a.createElement("li",null,"Initial remodelling costs if any"))),r.a.createElement("div",{className:"col-sm-12 col-md-4"},r.a.createElement("h4",null,"Global Equity"),r.a.createElement("p",null,"This model assumes that you invest your property deposit in ",r.a.createElement("a",{href:this.props.vanguardFundUrl},"Vanguard FTSE Global all cap index fund"),". Specifically the accumulation fund, which will re-invest company dividends"),r.a.createElement("p",null,"It also uses the the annualized growth rate over the last 5 years which is ",r.a.createElement("strong",null,this.percentFormat(this.props.vanguardFundReturn))),r.a.createElement("p",null,"This model does not account for:"),r.a.createElement("ul",null,r.a.createElement("li",null,"Market crashes"))),r.a.createElement("div",{className:"col-sm-12 col-md-4"},r.a.createElement("h4",null,"Gilts"),r.a.createElement("p",null,"Gilts are debt issued by the UK government to fund itself. While they aren't without risk they form one of the safest forms of investment.")))}}]),a}(r.a.Component),f=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).currencyFormatter=void 0,n.percentFormatter=void 0,n.percentFormatter=new Intl.NumberFormat("en-gb",{style:"percent",maximumFractionDigits:2}),n.currencyFormatter=new Intl.NumberFormat("en-gb",{style:"currency",currency:"GBP"}),n.state={data:[],legalCosts:1e3,mortgageFees:1e3,mortgageRate:.0315,agentFees:.08,maintenance:.1,housePriceGrowth:.02,propertyValue:80750,propertyRent:575,propertyDeposit:.25},n}return Object(o.a)(a,[{key:"stampDuty",value:function(){var e=this.state.propertyValue,t=0;if(e>15e5){var a=e-15e5;e=15e5,t+=.15*a}if(e>925e3){var n=e-925e3;e=925e3,t+=.13*n}if(e>25e4){var r=e-25e4;e=25e4,t+=.08*r}return e>0&&(t+=.03*e),t}},{key:"initialInvestment",value:function(){return this.state.propertyValue*this.state.propertyDeposit}},{key:"totalDebt",value:function(){return this.state.propertyValue*(1-this.state.propertyDeposit)}},{key:"annualIncomeAfterExpenses",value:function(){var e=12*this.state.propertyRent;return e-=e*this.state.agentFees,e-=this.state.mortgageRate*this.totalDebt(),e-=12*this.state.propertyRent*this.state.maintenance}},{key:"roi",value:function(){return this.annualIncomeAfterExpenses()/this.initialInvestmentPlusPurchaseCosts()}},{key:"grossYield",value:function(){return 12*this.state.propertyRent/this.state.propertyValue}},{key:"netYield",value:function(){return this.annualIncomeAfterExpenses()/this.state.propertyValue}},{key:"purchaseCosts",value:function(){return this.stampDuty()+this.state.mortgageFees+this.state.legalCosts}},{key:"initialInvestmentPlusPurchaseCosts",value:function(){return this.initialInvestment()+this.purchaseCosts()}},{key:"dataPoints",value:function(){for(var e=[],t=this.initialInvestment(),a=this.state.propertyValue,n=this.initialInvestment(),r=this.totalDebt(),s=this.purchaseCosts(),l=0,i=0;i<25;i++){var o=a-s-r;e.push({name:"Year "+(i+1),propertyEquity:o,propertyRetainedEarnings:l,propertyTotalReturn:l+o,gilts:n,globalEquity:t}),n*=1.03,a*=this.state.housePriceGrowth+1,l+=this.annualIncomeAfterExpenses(),t*=1.062}return e}},{key:"currencyFormat",value:function(e){return null==e?"":this.currencyFormatter.format(e)}},{key:"percentFormat",value:function(e){return null==e?"":this.percentFormatter.format(e)}},{key:"percentParse",value:function(e){var t=e.replace(/\%$/,""),a=parseFloat(t);return a>1?a/100:a}},{key:"currencyParse",value:function(e){var t=e.replace(/^\\xa3/,"").replace(/\,/,"");return parseFloat(t)}},{key:"render",value:function(){var e=this,t=this.dataPoints();return r.a.createElement("div",{className:"container "},r.a.createElement("div",{className:"row jumbotron"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h1",null,"Is this a good investment?"),r.a.createElement("small",null,"Calculate whether an investment property is a good investment relative to others"))),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-sm-12 col-md-4 mb-4"},r.a.createElement("h4",null,"Basics"),r.a.createElement(d,{label:"Property Value",value:this.state.propertyValue,format:this.currencyFormat.bind(this),parse:this.currencyParse.bind(this),onChange:function(t){e.setState({propertyValue:t})}}),r.a.createElement(d,{label:"Deposit (% of property value)",value:this.state.propertyDeposit,format:this.percentFormat.bind(this),parse:this.percentParse.bind(this),min:0,max:1,step:.01,onChange:function(t){console.log(t),e.setState({propertyDeposit:t})}}),r.a.createElement(d,{label:"Monthly Rental",value:this.state.propertyRent,format:this.currencyFormat.bind(this),parse:this.currencyParse.bind(this),onChange:function(t){e.setState({propertyRent:t})}}),r.a.createElement(d,{label:"Annual House price growth",value:this.state.housePriceGrowth,format:this.percentFormat.bind(this),parse:this.percentParse.bind(this),min:0,max:1,step:.01,onChange:function(t){e.setState({housePriceGrowth:t})}})),r.a.createElement("div",{className:"col-sm-12 col-md-4 mb-4"},r.a.createElement("h4",null,"Transaction Expenses"),r.a.createElement(d,{label:"Stamp Duty",value:this.stampDuty(),format:this.currencyFormat.bind(this),parse:this.currencyParse.bind(this),readonly:!0}),r.a.createElement(d,{label:"Legal costs",value:this.state.legalCosts,format:this.currencyFormat.bind(this),parse:this.currencyParse.bind(this),onChange:function(t){e.setState({legalCosts:t})}}),r.a.createElement(d,{label:"Mortgage Arrangement fees",value:this.state.mortgageFees,format:this.currencyFormat.bind(this),parse:this.currencyParse.bind(this),onChange:function(t){e.setState({mortgageFees:t})}})),r.a.createElement("div",{className:"col-sm-12 col-md-4"},r.a.createElement("h4",null,"Ongoing expenses"),r.a.createElement(d,{label:"Mortgage Interest Rate (%)",value:this.state.mortgageRate,format:this.percentFormat.bind(this),parse:this.percentParse.bind(this),min:0,max:1,step:.01,onChange:function(t){e.setState({mortgageRate:t})}}),r.a.createElement(d,{label:"Agent fees (% of rent)",value:this.state.agentFees,format:this.percentFormat.bind(this),parse:this.percentParse.bind(this),min:0,max:1,step:.01,onChange:function(t){e.setState({agentFees:t})}}),r.a.createElement(d,{label:"Maintenance (% of rent)",value:this.state.maintenance,format:this.percentFormat.bind(this),parse:this.percentParse.bind(this),min:0,max:1,step:.01,onChange:function(t){e.setState({maintenance:t})}}))),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Summary"),r.a.createElement("small",{className:"d-block d-md-none jumbotron"},r.a.createElement("strong",null,"Rotate your device for a more complete summary with tables & graphs!")))),r.a.createElement(E,{percentFormat:this.percentFormat.bind(this),currencyFormat:this.currencyFormat.bind(this),grossYield:this.grossYield(),netYield:this.netYield(),roi:this.roi(),annualIncomeAfterExpenses:this.annualIncomeAfterExpenses(),vanguardFundUrl:"https://www.vanguardinvestor.co.uk/investments/vanguard-ftse-global-all-cap-index-fund-gbp-acc/overview",vanguardFundReturn:.067-.005}),r.a.createElement("div",{className:"row d-none d-sm-block"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h4",null,"How does it compare?"),r.a.createElement(y,{format:this.currencyFormat.bind(this),data:t})),r.a.createElement("div",{className:"col-12"},r.a.createElement(m.f,{width:"100%",aspect:2},r.a.createElement(m.d,{data:t},r.a.createElement(m.g,{dataKey:"name"}),r.a.createElement(m.h,null),r.a.createElement(m.a,{strokeDasharray:"3 3"}),r.a.createElement(m.b,null),r.a.createElement(m.e,{y:this.initialInvestment(),label:"Initial Investment",strokeDasharray:"3 3"}),r.a.createElement(m.c,{name:"BTL",dataKey:"propertyTotalReturn",stroke:"#F00",strokeWidth:2}),r.a.createElement(m.c,{name:"BTL Equity",dataKey:"propertyEquity",stroke:"#F00",strokeWidth:1,opacity:.2}),r.a.createElement(m.c,{name:"BTL Income",dataKey:"propertyRetainedEarnings",stroke:"#900",opacity:.2,strokeWidth:1}),r.a.createElement(m.c,{name:"Gilts (UK Bonds)",dataKey:"gilts",stroke:"#0F0",strokeWidth:2}),r.a.createElement(m.c,{name:"Vanguard Global All Cap",dataKey:"globalEquity",stroke:"#00F",strokeWidth:2}))))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},84:function(e,t,a){}},[[169,1,2]]]);
//# sourceMappingURL=main.0196107c.chunk.js.map