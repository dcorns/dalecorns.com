/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(10);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(17);
	__webpack_require__(9);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(8);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(14);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * clientRoutes
	 * Created by dcorns on 2/10/16
	 * Copyright © 2016 Dale Corns
	 * Take in a route name for json data, if online download, otherwise check local storage, otherwise fail
	 * Check for existing storage, available storage and either store keep. Return true if exists or successfully added.
	 */
	'use strict';
	var doAjax = __webpack_require__(2);
	module.exports = function clientRoutes(){
	  return{
	    getData: function(path, cb, token){
	      doAjax.ajaxGetJson('/' + path, function(err, data){
	        if(err){
	          if(!(window.localStorage.getItem(path))) cb(err, null);
	          else cb(null, JSON.parse(window.localStorage.getItem(path)));
	        }
	        else{
	          window.localStorage.setItem(path, JSON.stringify(data));
	          cb(null, data);
	        }
	      }, token);
	    }
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * doAjax
	 * Created by dcorns on 1/9/16
	 * Copyright © 2016 Dale Corns
	 * version 2.0.0 March 2016
	 */
	'use strict';
	module.exports = function(){
	  return{
	    ajaxGet: function ajaxGet(url, cb, token){
	      var ajaxReq = new XMLHttpRequest();
	      ajaxReq.addEventListener('load', function(){
	        if(ajaxReq.status === 200) cb(null, {responseText: ajaxReq.responseText, rawAjaxRequest: ajaxReq});
	        else cb({statusCode: ajaxReq.status, rawAjaxRequest: ajaxReq}, null);
	      });
	      ajaxReq.addEventListener('error', function(data){
	        console.dir(data);
	        var err = new Error('A fatal error occurred during ajaxGet, see console for more information');
	        err.name = 'XMLHttpRequestError';
	        cb(err, null);
	      });

	      ajaxReq.open('GET', url, true);
	      if(token){
	        ajaxReq.setRequestHeader('Authorization', token);
	      }
	      ajaxReq.send();
	    },

	    ajaxGetJson: function ajaxGetJson(url, cb, token){
	      var ajaxReq = new XMLHttpRequest();
	      ajaxReq.addEventListener('load', function(){
	        if(ajaxReq.status === 200) cb(null, {json: JSON.parse(ajaxReq.responseText), rawAjaxRequest: ajaxReq});
	        else cb({statusCode: ajaxReq.status, rawAjaxRequest: ajaxReq}, null);
	      });
	      ajaxReq.addEventListener('error', function(data){
	        console.dir(data);
	        var err = new Error('A fatal error occurred during ajaxGetJson, see console for more information');
	        err.name = 'XMLHttpRequestError';
	        cb(err, null);
	      });

	//Must open before setting request header, so this order is required
	      ajaxReq.open('GET', url, true);
	      //ajaxReq.setRequestHeader('Content-Type', 'application/json');
	      if(token){
	        ajaxReq.setRequestHeader('Authorization', token);
	      }
	      ajaxReq.send();
	    },
	    ajaxPostJson: function ajaxPostJson(url, jsonData, cb, token){
	      var ajaxReq = new XMLHttpRequest();
	      ajaxReq.addEventListener('load', function(){
	        if(ajaxReq.status === 201 || ajaxReq.status === 200) cb(null, {json: JSON.parse(ajaxReq.responseText), rawAjaxRequest: ajaxReq});
	        else cb({statusCode: ajaxReq.status, rawAjaxRequest: ajaxReq}, null);
	      });
	      ajaxReq.addEventListener('error', function(data){
	        console.dir(data);
	        var err = new Error('A fatal error occurred during ajaxPostJson, see console for more information');
	        err.name = 'XMLHttpRequestError';
	        cb(err, null);
	      });

	//Must open before setting request header, so this order is required
	      ajaxReq.open('POST', url, true);
	      ajaxReq.setRequestHeader('Content-Type', 'application/json');
	      if(token){
	        ajaxReq.setRequestHeader('Authorization', token);
	      }
	      ajaxReq.send(JSON.stringify(jsonData));
	    },
	    ajaxPutJson: function(url, jsonData, cb, token){
	      var ajaxReq = new XMLHttpRequest();
	      ajaxReq.addEventListener('load', function(){
	        if(ajaxReq.status === 200) cb(null, {json: JSON.parse(ajaxReq.responseText), rawAjaxRequest: ajaxReq});
	        else cb({statusCode: ajaxReq.status, rawAjaxRequest: ajaxReq}, null);
	      });
	      ajaxReq.addEventListener('error', function(data){
	        console.dir(data);
	        var err = new Error('A fatal error occurred during ajaxPutJson, see console for more information');
	        err.name = 'XMLHttpRequestError';
	        cb(err, null);
	      });

	//Must open before setting request header, so this order is required
	      ajaxReq.open('PUT', url, true);
	      ajaxReq.setRequestHeader('Content-Type', 'application/json');
	      if(token){
	        ajaxReq.setRequestHeader('Authorization', token);
	      }
	      ajaxReq.send(JSON.stringify(jsonData));
	    }
	  }
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * exampleLinks
	 * Created by dcorns on 1/11/16
	 * Copyright © 2016 Dale Corns
	 * Used With Skills View and by skills.js
	 */
	'use strict';
	var doAjax = __webpack_require__(2);
	var clientRoutes = __webpack_require__(1)();
	module.exports = function(skillName, competencies, el, btnReturn, btnReturnFunction){

	  var exampleObj,
	    h = document.createElement('h3'),
	    exampBtns = document.createElement('nav');
	    el.textContent = '';

	  addSkillNameHeading();

	  clientRoutes.getData('examples', function(err, data){
	    if(err){
	      alert('No local example data found. Internet connection required.');
	      return;
	    }
	    var exampleList = getExampleList(skillName, data, competencies[0].technologies);
	    if(exampleList.length < 1){
	      h.textContent = 'There are currently no examples listed for ' + skillName;
	      el.appendChild(h);
	      return;
	    }
	    addExamples(exampleList, competencies[1].specifics);
	  });




	  exampBtns.addEventListener('click', function(e){
	    var exampleDetails = e.target.dataset;
	    btnReturn.removeEventListener('click', btnReturnFunction);
	    btnReturn.addEventListener('click', backToFileList);
	    exampleDetails.fileName = e.target.textContent;
	    el.textContent = '';
	      getExample(exampleDetails.rawTextLink, function(err, rawText){
	        if(err){
	          alert('Error loading text from ' + e.target.rawTextLink);
	          return;
	        }
	        clientRoutes.getData('repos', function(err, data){
	          if(err){
	            alert('No local repository data. Internet required for data download');
	          }
	          makeCodePage(el, rawText, exampleDetails, data);
	        });
	      });
	  });

	  function backToFileList(){
	    el.textContent = '';
	    addSkillNameHeading();
	    el.appendChild(exampBtns);
	    btnReturn.removeEventListener('click', backToFileList);
	    btnReturn.addEventListener('click', btnReturnFunction);
	  }

	  function addSkillNameHeading(){
	    h.textContent = 'Code Examples for ' + skillName + ' Skills';
	    el.appendChild(h);
	  }

	  function addExamples(exampleList, specifics){
	    var count = 0, len = exampleList.length;
	    for(count; count < len; count++){
	      var d = document.createElement('div');
	      var btn = document.createElement('button');
	      btn.textContent = exampleList[count].fileName;
	      btn.alt = exampleList[count].fileName;
	      btn.dataset.rawTextLink = exampleList[count].rawTextLink;
	      btn.dataset.repoID = exampleList[count].repoID;
	      d.appendChild(btn);
	      var p = document.createElement('p');
	      var specString = '';
	      for (var spec of exampleList[count].specificsID){
	        specString = specString + specifics[spec] + ', '
	      }
	      specString = specString.slice(0, specString.lastIndexOf(','));
	      p.innerText = specString;
	      d.appendChild(p);
	      exampBtns.appendChild(d);
	    }
	    el.appendChild(exampBtns);
	  }

	};

	function getExampleList(skillName, examples, skills){
	  var xmp = [];
	  var skillId = skills.indexOf(skillName);
	  for(var f of examples){
	    for(var ex of f.technologiesID){
	      if(skillId === ex) xmp.push(f);
	    }
	  }
	  return xmp;
	}
	//get file from file link
	function getExample(fileName, cb){
	  doAjax.ajaxGet(fileName, function(err, data){
	    if(err) cb(err, null);
	    else cb(null, data);
	  });
	}

	function makeCodePage(el, rawText, details, repos){
	  var codeArticle = document.getElementById('code-article'),
	    codeContainer = document.getElementById('code-container'),
	    theCode = document.getElementById('the-code'),
	    fileName = document.getElementById('file-name'),
	    pRepo = document.getElementById('parent-repo');
	  if(codeArticle){
	    codeArticle.innerText = rawText;
	    el.appendChild(codeArticle);
	  }
	  else{
	    codeArticle = document.createElement('article');
	    codeContainer = document.createElement('pre');
	    theCode = document.createElement('code');
	    pRepo = document.createElement('a');
	    fileName = document.createElement('h3');
	    codeArticle.id = 'code-article';
	    codeContainer.id = 'code-container';
	    theCode.id = 'the-code';
	    pRepo.id = 'parent-repo';
	    fileName.id = 'file-name';
	    fileName.textContent = details.fileName;
	    codeArticle.appendChild(fileName);
	    if(repos){
	      pRepo.textContent = ' Repo: ' + repos[details.repoID].name;
	      pRepo.href = repos[details.repoID].href;
	      codeArticle.appendChild(pRepo);
	    }
	    theCode.innerText = rawText;
	    codeContainer.appendChild(theCode);
	    codeArticle.appendChild(codeContainer);
	    el.appendChild(codeArticle);
	  }
	}

	//function getRepoFromId(repoID, db){
	//  return db.repos[repoID];
	//}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * helperMethods.js
	 * Created by dcorns on 3/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = (function(){
	  return{
	    //Take an array of elements and toggles the given class
	    toggleClass: function toggleClass(elArray, tClass){
	      if(!(Array.isArray(elArray))) return null;
	      if((typeof tClass !== 'string')) return null;
	      let i = 0, len = elArray.length;
	      for(i; i < len; i++) {
	        try {
	          elArray[i].classList.toggle(tClass);
	        }
	        catch (e) {
	          throw e;
	        }
	      }
	    }
	  };
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * index
	 * Created by dcorns on 12/31/15
	 * Copyright © 2015 Dale Corns
	 */
	'use strict';
	//Main JS File
	var mySkills = {};
	mySkills.sharedObjects = __webpack_require__(6);
	var slideShow = __webpack_require__(7);
	var slides = __webpack_require__(8);
	var doAjax = __webpack_require__(2);
	mySkills.ajax = doAjax;
	var pages = __webpack_require__(9);
	mySkills.help = __webpack_require__(4);
	var pageScripts = __webpack_require__(10);
	var route = __webpack_require__(17)(pages, pageScripts, mySkills);//(view, controller, app)

	slideShow.loadImages(slides);
	slideShow.swap();
	slideShow.play(10000);
	//load shared and dom objects
	mySkills.sharedObjects.init();

	checkForToken();

	var header = document.getElementById('top');
	//default view
	route('#/current');

	header.addEventListener('mouseover', function(){
	  slideShow.play(3000);
	});

	function firstDo(){
	  console.log('firstDo');
	  //Handle Refresh by checking session storage for last href and redirecting if it exists
	  var lastHref = window.sessionStorage.getItem('href');
	  var netAction = window.sessionStorage.getItem('netAction');
	  if (lastHref) {
	    route(lastHref);
	  }
	  else {//load home template
	    lastHref = '#/current';
	    window.sessionStorage.setItem('href', lastHref);
	    window.history.pushState(null, null, lastHref);
	    route(lastHref);
	  }
	  //Add event handlers for 'a' tags
	  var links = document.getElementsByTagName('a');
	  var idx = 0, ln = links.length;
	  for (idx; idx < ln; idx++) {
	    links[idx].addEventListener('click', function (e) {
	      //if the link is local routing link, save location for when returning to the site...filters out external links based on the presence of #/
	      if(this.href.indexOf('#/') > -1){
	        window.sessionStorage.setItem('href', this.href);
	      }
	      window.history.pushState(null, null, this.href);
	      e.preventDefault();
	      route(this.href);
	    });
	  }
	  //Add front and back button handler
	  window.addEventListener('popstate', function () {
	    window.sessionStorage.setItem('href', location.href);
	    route(location.href);
	  });
	}

	//mobile logic
	var btnMobileMenu = document.getElementById('btnMobileMenu');
	var mobileMenu = document.getElementById('mobile-menu-items');
	btnMobileMenu.addEventListener('click', function(){
	  mySkills.help.toggleClass([mobileMenu], 'hide');
	});
	mobileMenu.addEventListener('click', function(e){
	  mySkills.help.toggleClass([mobileMenu], 'hide');
	});

	function winready(f){
	  var preOnload = window.onload;
	  if(typeof preOnload !== 'function'){
	    window.onload = f;
	  }
	  else{
	    window.onload = function() {
	      preOnload();
	      f();
	    }
	  }
	}

	function checkForToken(){
	  const DRCToken = localStorage.getItem('DRCToken');
	  if(DRCToken){
	    doAjax.ajaxPostJson('/tokenAccess',{DRCToken: DRCToken}, function(err, data){
	      if(err){
	        console.log('error');
	        console.error(err);
	      } 
	      else{ 
	        console.log(data);
	        console.log('token Exist use token for access');
	        mySkills.help.toggleClass(mySkills.sharedObjects.toggleElements, 'hide');
	      }
	    });
	  }
	}

	winready(firstDo());

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * sharedObjects
	 * Created by dcorns on 3/20/16
	 * Copyright © 2016 Dale Corns
	 * Add all objects that are shared by multiple functions here. This will usually be dom objects that persist across views
	 * Since I want to require at the top of module it uses an init function to run after the dom is loaded.
	 */
	'use strict';
	module.exports = function(app){

	  var sharedObjects = {
	    init: function init(){
	      getToggleElements(this.toggleElements);
	    },
	    toggleElements: []
	  };
	  if(app){
	    if(typeof app === 'object' && app !== null){
	      app.sharedObjects = sharedObjects;
	      return app.sharedObjects;
	    }
	  }
	  else{
	    return sharedObjects;
	  }
	  
	}();

	function getToggleElements(ary){
	  var btnLogin = document.getElementById('btnLogin');
	  var btnLogOut = document.getElementById('btnLogOut');
	  var btnProfile = document.getElementById('btnProfile');
	  ary.push(btnLogin, btnLogOut, btnProfile);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * slideShow
	 * Created by dcorns on 12/31/15
	 * Copyright © 2015 Dale Corns
	 * Given an array of image sources, display a slide show
	 */
	'use strict';
	module.exports = function(){
	  var imgs = [], count = 0;
	  var showInterval, playing = false;
	  var slideShow = document.getElementById('slide-show');
	  return{
	    loadImages: function loadImages(imgArray){
	      var len = imgArray.length, item = 0;
	      for (item; item < len; item++){
	        imgs[item] = new Image();
	        imgs[item].src = imgArray[item];
	      }
	    },
	    play: function play(tm){
	      if(!(playing)){
	        playing = true;
	        var slideTime = tm || 1000;
	        showInterval = setInterval(function(){
	          if(count > imgs.length -1) count = 0;
	          slideShow.innerHTML = '';
	          slideShow.appendChild(imgs[count]);
	          count++;
	        }, slideTime);
	      }
	    },
	    stop: function stop(imgNum){
	      if(playing){
	        if(count > imgs.length - 1) count = 0;
	        count = imgNum || count;
	        clearInterval(showInterval);
	        slideShow.innerHTML = '';
	        slideShow.appendChild(imgs[count]);
	        playing = false;
	      }
	    },
	    swap: function swap(imgNum){
	      if(!(playing)){
	        slideShow.innerHTML = '';
	        var imgIdx;
	        if (imgNum) imgIdx = imgNum;
	        else {
	          if(count > imgs.length - 1) count = 0;
	          imgIdx = count;
	          count++;
	        }
	        slideShow.appendChild(imgs[imgIdx]);
	      }
	    }
	  }
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * slides.js
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = function(){
	  return ['small-slides/slide17.JPG', 'small-slides/slide19.JPG'];
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	module.exports = {"aboutMe":"<section id=\"aboutme\">\n    <article class=\"large-article\">\n        <h3>My Journey To Software Development as a Profession</h3>\n        <p>I have always loved Technology and growing up I would disassemble things and sometimes put them back together again. I would work on cars with my Father and watch him work on old tube tv sets. (and I don\\'t mean just the cathode ray tube) When computers came out for the general public, I was fascinated and enjoyed spending hours making things with them. Writing little programs in BASIC to run on the television only to have them erased for lack of external storage. After high school I attended a technical college where I did micro processor programing using assembly code and loved it. I also learned more about electronics and have enjoyed building and experimenting around with circuits ever since. I started my career in IT back in 1981 when when IBM thought we would never need more than 64K of memory in a PC. I preferred writing software, but the jobs were more plentiful on the hardware side of things so I pursued and excelled as a hardware tech and network administrator, but I wrote software to support my efforts and those of my co-workers when possible. As the PC boom subsided I became more focused on small business network and PC support and in 2001 started my own business working for companies like Lockheed Martin and Snohomish County Washington. Just a few large clients kept me going pretty good for about seven years. It was during this time that I began to focus more on software. Creating opportunities with existing clients whenever I found a tool that they were using which I could enhance or write new tools when I saw a need. This required me to pick up some new languages quickly in order to provide something to customers at a reasonable price. In the meantime I was developing tools for my own business to help me stay on top of things. I began writing an entire service management system using .NET, C#, MSSQL and JavaScript. Since the application ran in a browser, I was able to access all aspects of the system from anywhere an Internet connection existed. It was a large undertaking and I would add functionality as I saw need, then moving on to some other aspect as that need became greater. For example I wrote modules for accounting, contact management, inventory, service tracking, asset management and whatever else could be helped through software. Unfortunately due to the size of this undertaking, I was never able to complete everything. There were some real cool features, but I kept bouncing around as needed so it never became a finished product. I would see a need and write the software to meet the need. This is really were I cut my teeth on building web application software. I think that what I produced was very unique and useful. Had I completed it, I believe it would have been a great success as a very useful tool for Technical service businesses everywhere. Sometimes I consider going back and continuing with the project, but there are so many new things to do every day. Like writing a time management app for the Windows phone. Yes I was working on and using that tool until Microsoft decided to move on to Windows 8 and required their phone developers to use Windows 8 on the desktop development machine in order to use the new tool kit. This discouraged me from moving forward writing for the Windows phone.</p>\n    <p>After this and writing custom native apps and services for clients I decided to take a full on plunge into the software industry as my primary career focus. In 2013 I graduated from the full stack JavaScript development accelerator/boot camp at Code Fellows in South Lake Union Seattle. There I learned how the industry works using agile methodologies and the tools being used by other professionals to collaborate and create scalable web applications using only JavaScript on the front and back end. Since then I have been taking Freelance work and teaching others how to do the same.</p></article>\n<article class=\"small-article\">\n    <h4>Geography</h4><p>My Father was in the Air Force for the first 5 years of my life and then took on work in retail. So we moved a lot while I was growing up. I settled down in the Seattle area at around age 18, then went to work in the Los Angles area for about 5 years before moving back up to Seattle and have been here ever since.</p>\n</article>\n    <article class=\"small-article\">\n        <h4>IT-less Passions</h4><p>At age 11 I wanted to be a magician and did one magic show where the neighbor hood kids were invited via radio station that did a free add for me. I grew up in church and by age 12 I was running the sound for a small church we attended and by that time had already sung a few solos and participated in choirs at the churches we attended. By age 14 I had learned to play the guitar and as a teen I began writing and performing my own songs. I have continued to sing and play guitar alone, and as a part of ensembles to this day. I have also experimented with keyboards and really like playing the trumpet when I have one. Back in the 1990\\'s I studied and performed classical guitar seriously for about five years. It was a lot of work and there was not as much opportunity to do it professionally compared to computer technology, so I abandoned it as a means of financial gain. But I am glad I did it. Music is awesome and will always be a part of my life. Fortunately both fields thrive on technical knowledge and creativity.</p>\n    </article>\n    <article class=\"small-article\">\n        <h4>Working Character</h4><p>I really like learning new things and getting better at anything I do. I do not like doing anything part of the way. I am always all in. As a consequence I have a very hard time giving up on anything I set out to do. This is good because I will work on a task undaunted by obstructions until all is achieved. On the other hand I could spend too much time getting no where on something, being unwilling to accept that I can not get it done. I believe that any thing worth doing is worth doing well. I also believe that more is accomplished with a group of people that have a common goal, than one person with passion and vision working on his/her own. So being able to infect others with one\\'s passion and vision is critical to bringing any large project to completion in a timely manner.</p>\n    </article>\n\n</section>","accolades":"<h3>Accolades</h3>Accolades regarding my work can be found on my linkedin account. Additional comments may be left here if you submit and email.","current":"<svg style=\"display:none\">\n    <symbol id=\"icon-link\" viewBox=\"0 0 512 512\">\n        <path d=\"M131.525,357.807l226.281-226.281l22.625,22.625L154.15,380.432L131.525,357.807z M218.588,361.244\n\tc2.719,10.594,0.453,22.219-7.844,30.5l-45.266,45.281c-12.5,12.5-32.734,12.5-45.25,0l-45.25-45.281\n\tc-12.516-12.5-12.516-32.719,0-45.25l45.25-45.25c8.281-8.281,19.859-10.531,30.453-7.875l47.578-47.563\n\tc-37.469-26.594-89.734-23.359-123.281,10.188l-45.266,45.25c-37.422,37.438-37.422,98.344,0,135.781l45.266,45.25\n\tc37.422,37.438,98.328,37.438,135.766,0l45.25-45.25c33.563-33.563,36.75-85.875,10.141-123.344L218.588,361.244z M482.275,74.979\n\tl-45.25-45.266c-37.438-37.422-98.344-37.422-135.781,0l-45.25,45.266c-33.547,33.547-36.781,85.813-10.188,123.281l47.594-47.594\n\tc-2.688-10.578-0.438-22.156,7.844-30.438l45.25-45.25c12.5-12.5,32.75-12.516,45.25,0l45.281,45.25\n\tc12.5,12.516,12.469,32.766,0,45.25l-45.281,45.266c-8.281,8.297-19.906,10.547-30.5,7.844l-47.563,47.563\n\tc37.438,26.625,89.781,23.406,123.344-10.156l45.25-45.25C519.713,173.307,519.713,112.4,482.275,74.979z\"></path>\n    </symbol>\n</svg>\n\n<section id=\"current\">\n    <h3>Current Activity</h3>\n    <table id=\"tbl-activity\">\n        <tr>\n            <th>Activity</th><th>Link</th><th>Start Date</th>\n        </tr>\n    </table>\n    <h3>Recently Completed</h3>\n    <table id=\"tbl-complete\">\n        <tr>\n            <th>Activity</th><th>Link</th><th>Start Date</th><th>End Date</th>\n        </tr>\n    </table>\n    <section id=\"activity-detail\" class=\"hide\">\n\n    </section>\n</section>\n","examples":"<h3>Work Examples</h3><p>Links to actual production sites to which I have contributed.</p><p>You\\'re looking at it</p>","login":"<h1>Login</h1>\n<input id=\"emailIn\" type=\"email\" required><label for=\"emailIn\">Enter email address</label>\n<input id=\"passwordIn\" type=\"password\" required><label for=\"passwordIn\">Enter Password</label>\n<button id=\"btnSubmitLogin\">GO</button><a href=\"#/register\">Request a Login</a>","logout":"<h1>Your Are Now Logged Out</h1>","myProfile":"<script src=\"https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js\"></script>\n<script> window.ko || document.write(\"<script src='js/libs/knockout-3.4.0.js'>\\x3C/script>\")</script>\n<h1>Profile View</h1>\n<nav>\n    <button id=\"btnaboutme\">AboutMe</button>\n    <button id=\"btncurrent\">Current Activities</button>\n    <button id=\"btnexamples\">Examples</button>\n    <button id=\"btnrepos\">Repositories</button>\n    <button id=\"btnposts\">Postings</button>\n    <button id=\"btnprojects\">Projects</button>\n    <button id=\"btnexternallinks\">Links</button>\n    <button id=\"btncompetencies\">Skills</button>\n</nav>\n<section id=\"profile-content\">\n\n</section>","posts":"<h3>Posts</h3>Links to or api generated content from where my posts are","profileAboutMe":"<h1 id=\"mainHeader\">Main Header</h1>\n<section id=\"aboutMePreview\"></section>\n<p>Save as many heading and details pairs as you wish to tell your story</p>\n<input id=\"mainHeaderIn\" type=\"text\" placeholder=\"Main Header\">\n<input id=\"aboutMeHeading\" type=\"text\" placeholder=\"Heading\">\n<textarea id=\"aboutMeText\" placeholder=\"Details\"></textarea><button id=\"addSection\">Add Section</button>\n<button id=\"aboutMeSave\">SAVE ALL</button>","profileCompetencies":"<h2>Skills</h2>","profileCurrent":"<h3>Current Activity</h3>\n<table id=\"currentItemsList\"></table><input id=\"startDate\" type=\"date\" placeholder=\"Start Date Here\"><input id=\"activity\" type=\"text\" placeholder=\"Enter Activity\"><input id=\"endDate\" type=\"date\" placeholder=\"Completion Date Here\"><button id=\"addItem\">Add To List</button><button id=\"updateItem\">Update</button><button id=\"removeItem\">Remove</button>","profileExamples":"<h2>Examples</h2>","profileExternalLinks":"<h2>External Links</h2>","profilePosts":"<h2>Posts</h2>","profileProjects":"<h2>Projects</h2>","profileRepos":"<h2>Repos</h2>","projects":"<h3>Project List</h3>hopefully can be populated with Github api","register":"<h1>Account Sign Up</h1>\n<input id=\"emailIn\" type=\"email\" required><label for=\"emailIn\">Enter email address</label>\n<input id=\"passwordIn\" type=\"password\" required><label for=\"passwordIn\">Enter Password</label>\n<input id=\"confirmPassword\" type=\"password\" required><label for=\"confirmPassword\">Confirm Password</label>\n<button id=\"saveAccount\">SUBMIT</button>","skills":"<section id=\"job-skills\" class=\"job-skills\">\n    <h3 id=\"skHeader\">Languages, Frameworks and Libraries</h3>\n    <nav id=\"lang-fram-btns\"></nav><img id=\"btnreturn\" class=\"hide img-btn\" src=\"icon/return40.png\">\n    <article id=\"example-list\"></article>\n    <section><h3>IDE\\'s and Tools</h3>Sublime Text, Web Storm, Android Studio, Visual Studio, Grunt, Gulp</section>\n</section>"};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * pageScripts
	 * Created by dcorns on 1/13/16
	 * Copyright © 2016 Dale Corns
	 * Provides all the views with their logic
	 */
	'use strict';

	module.exports = {
	    skills: __webpack_require__(11),
	    current: __webpack_require__(12),
	    login: __webpack_require__(13),
	    register: __webpack_require__(14),
	    logout: __webpack_require__(15),
	    myProfile: __webpack_require__(16)
	  };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * skills
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 * Script for skills view, so expects certain dom elements to exist, automatically updates buttons and links for skills when exampleData changes.
	 */
	'use strict';
	var exampleLinks = __webpack_require__(3);
	var clientRoutes = __webpack_require__(1)();
	var competencies;
	module.exports = function skills(){
	  var btns = document.getElementById('lang-fram-btns'),
	    exampleList = document.getElementById('example-list'),
	    btnreturn = document.getElementById('btnreturn'),
	    h = document.getElementById('skHeader');

	  function goBackToSkillsMenu(){
	    btns.classList.toggle('hide');
	    h.classList.toggle('hide');
	    btnreturn.classList.toggle('hide');
	    exampleList.textContent = '';
	  }

	  clientRoutes.getData('skills', function(err, data){
	    if(err){
	      alert('No skills data found locally. Internet required to load skills data.');
	      return;
	    }
	    addButtons('lang-fram-btns', data[0].technologies);
	    competencies = data;
	  });

	  btnreturn.addEventListener('click', goBackToSkillsMenu);

	  btns.addEventListener('click', function(e){
	    btnreturn.classList.toggle('hide');
	    var skill = e.target.textContent;
	    btns.classList.toggle('hide');
	    h.classList.toggle('hide');
	    if(e.target.id === 'lang-fram-btns') skill = '';


	    exampleLinks(skill, competencies, exampleList, btnreturn, goBackToSkillsMenu);
	  });
	};

	function addButtons(el, ary){
	  var btnsHere = document.getElementById(el);
	  btnsHere.textContent = '';
	  for (var name of ary){
	    var btn = document.createElement('button');
	    btn.textContent = name;
	    btnsHere.appendChild(btn);
	  }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * current
	 * Created by dcorns on 2/9/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	var clientRoutes = __webpack_require__(1)();
	module.exports = function current(){
	  var tblActivity = document.getElementById('tbl-activity');
	  var tblComplete = document.getElementById('tbl-complete');
	  clientRoutes.getData('current', function(err, data){
	    if(err){
	      alert('No current data stored locally. Internet connection required');
	      console.error(err);
	      return;
	    }
	    buildActivityTable(data, tblActivity, tblComplete);
	  });
	};

	function appendActivity(aObj, tbl, isComplete){
	  var row = document.createElement('tr');
	  var startDate = document.createElement('td');
	  var activityLink = document.createElement('td');
	  var activity = document.createElement('td');
	  activity.innerText = aObj.activity;
	  var endDate = isComplete ? document.createElement('td') : null;
	  startDate.innerText = new Date(aObj.startDate).toLocaleDateString();
	  if(aObj.link){
	    var anchor = document.createElement('a'), anchorIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), anchorUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	    anchor.href = aObj.link;
	    anchorIcon.setAttribute('class', 'icon');
	    anchorUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href','#icon-link');
	    anchorIcon.appendChild(anchorUse);
	    anchor.appendChild(anchorIcon);
	    activityLink.appendChild(anchor);
	  }

	  row.appendChild(activity);
	  row.appendChild(activityLink);
	  row.appendChild(startDate);
	  if(endDate){
	    endDate.innerText = new Date(aObj.endDate).toLocaleDateString();
	    row.appendChild(endDate);
	  }
	  if(aObj['details']){
	    addDetails(row, aObj.details);
	  }
	  tbl.appendChild(row);
	}

	function buildActivityTable(data, tblNow, tblOld){
	  //Sort by start date using custom sort compare function
	  data = data.json;
	  data.sort(function(a, b){
	    return new Date(a.startDate) - new Date(b.startDate);
	  });
	  var len = data.length;
	  var c = 0;
	  for(c; c < len; c++){
	    if(!(data[c].endDate)){
	      appendActivity(data[c], tblNow, false);
	    }
	    else{
	      appendActivity(data[c], tblOld, true);
	    }
	  }
	}
	//addDetails
	//Uses the activity-detail element from current.html and the hide class from layout.css
	//Receives a tr element and activity details text
	//prepends a button to click for details on the first td of the tr and adds an event listener to display or hide the details below the row when the button is clicked.
	function addDetails(rowIn, details){
	  let btn = document.createElement('button');
	  btn.textContent = '*';
	  rowIn.setAttribute('data-details', details);

	  btn.addEventListener('click', function(){
	    let detailSection = document.getElementById('activity-detail');
	    detailSection.classList.toggle('hide');
	    if(!(detailSection.classList.contains('hide'))){
	      let row = this.parentNode.parentNode;
	      let rect = row.getBoundingClientRect();
	      console.dir(rect);
	      detailSection.style.left = `${rect.left}px`;
	      detailSection.style.top = `${rect.top + rect.height}px`;
	      detailSection.style.width = `${rect.width}px`;
	      detailSection.innerHTML=row.getAttribute('data-details');
	    }
	  });
	  rowIn.childNodes[0].insertBefore(btn, rowIn.childNodes[0].childNodes[0]);
	  //rowIn.childNodes[0].innerHTML = btn.outerHTML + rowIn.childNodes[0].innerHTML;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * login
	 * Created by dcorns on 3/8/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	var doAjax = __webpack_require__(2);

	module.exports = function login(app){
	  var emailIn = document.getElementById('emailIn');
	  var passwordIn = document.getElementById('passwordIn');
	  var btnSubmitLogin = document.getElementById('btnSubmitLogin');

	  btnSubmitLogin.addEventListener('click', function(){
	      doAjax.ajaxPostJson('/login', {email: emailIn.value, password: passwordIn.value}, function(err, data){
	        if(err){
	          alert('Login Failed: ' + err);
	          console.dir(err);
	          sessionStorage.setItem('email', emailIn.value);
	          window.location = '#/register';
	        }
	        else{
	          app.help.toggleClass(app.sharedObjects.toggleElements, 'hide');
	          localStorage.setItem('DRCToken', data.token);
	          window.location = '#/posts';
	        }
	      });
	  });
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * register
	 * Created by dcorns on 3/13/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	var doAjax = __webpack_require__(2);

	module.exports = function register(app){
	  var emailIn = document.getElementById('emailIn');
	  var passwordIn = document.getElementById('passwordIn');
	  var confirmPassword = document.getElementById('confirmPassword');
	  var btnSaveAccount = document.getElementById('saveAccount');
	  emailIn.value = sessionStorage.getItem('email');

	  btnSaveAccount.addEventListener('click', function(){
	    if(passwordIn.value !== confirmPassword.value){
	      alert('Passwords do not match');
	    }
	    else{
	      doAjax.ajaxPostJson('/newAccount', {email: emailIn.value, password: passwordIn.value}, function(err, data){
	        if(err) alert('Account Creation Failed: ' + err);
	        else{
	          app.help.toggleClass(app.sharedObjects.toggleElements, 'hide');
	          sessionStorage.removeItem('email');
	          localStorage.setItem('DRCToken', data.token);
	          window.location = '#/posts';
	        }
	      });
	    }
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * logout
	 * Created by dcorns on 3/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = function logout(app){
	  //window.localStorage.removeItem('DRCToken');
	  window.localStorage.clear();
	  if(window.localStorage.getItem('DRCToken')){
	    alert('Token failed deletion, delete DRCToken manually from localStorage to logout!');
	  }
	  else{
	    app.help.toggleClass(app.sharedObjects.toggleElements, 'hide');
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * myProfile
	 * Created by dcorns on 3/21/16
	 * Copyright © 2016 Dale Corns
	 * Provides for individual profile data updating.
	 */
	'use strict';
	const route = __webpack_require__(1)();
	const pages = __webpack_require__(9);
	//requiring pageScripts here will only produce an empty object, pass an object with the required views instead
	const viewRouter = __webpack_require__(17)(pages, {
	  profileAboutMe: __webpack_require__(18),
	  profileCurrent: __webpack_require__(19)
	});
	module.exports = function myProfile(app){
	  var myData;
	  //check for existing profile data and load if it exists
	  var token = window.localStorage.getItem('DRCToken');
	  route.getData('myProfile', function(err, data){
	    if(err){
	      alert('No profile data found locally. Internet required to load profile data. Or you are not authorized for a profile account');
	      window.location = '#/current';
	    }
	    else{
	      myData = data;
	      console.dir(myData);
	    }

	  }, token);
	  var btnAbout = getById('btnaboutme');
	  var btnCurrent = getById('btncurrent');
	  var btnExamples = getById('btnexamples');
	  var btnRepos = getById('btnrepos');
	  var btnPosts = getById('btnposts');
	  var btnProjects = getById('btnprojects');
	  var btnExternalLinks = getById('btnexternallinks');
	  var btnCompetencies = getById('btncompetencies');
	  
	  btnAbout.addEventListener('click', function(){
	    viewRouter('#/profileAboutMe', 'profile-content');
	  });
	  btnCurrent.addEventListener('click', function(){
	    viewRouter('#/profileCurrent', 'profile-content');
	  });
	  btnExamples.addEventListener('click', function(){
	    viewRouter('#/profileExamples', 'profile-content');
	  });
	  btnRepos.addEventListener('click', function(){
	    viewRouter('#/profileRepos', 'profile-content');
	  });
	  btnPosts.addEventListener('click', function(){
	    viewRouter('#/profilePosts', 'profile-content');
	  });
	  btnProjects.addEventListener('click', function(){
	    viewRouter('#/profileProjects', 'profile-content');
	  });
	  btnExternalLinks.addEventListener('click', function(){
	    viewRouter('#/profileExternalLinks', 'profile-content');
	  });
	  btnCompetencies.addEventListener('click', function(){
	    viewRouter('#/profileCompetencies', 'profile-content');
	  });
	  
	  function getById(btnId){
	    return document.getElementById(btnId);
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * router.js
	 * Created by dcorns on 5/25/15.
	 * takes in a view object like the one created with grunt-add-view and if it has javascript file by the same name in the controllers object, it will run it.
	 */
	'use strict';
	module.exports = function viewRouter(views, controllers, app){
	  function loadRoute(route, pEl){
	    var el = pEl || 'main-content';
	    var view = route.substr(route.lastIndexOf('/') + 1);
	    document.getElementById(el).innerHTML = views[view];
	    if(controllers[view]){
	      controllers[view](app);
	    }
	  }
	  return loadRoute;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * profileAboutMe
	 * Created by dcorns on 3/22/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	const doAjax = __webpack_require__(2);
	module.exports = function profileAboutMe(){
	  let mainHeaderIn = document.getElementById('mainHeaderIn');
	  let myProfile = JSON.parse(localStorage.getItem('myProfile'));
	  let mainHeader = document.getElementById('mainHeader');
	  let aboutMeText = document.getElementById('aboutMeText'), aboutMeSave = document.getElementById('aboutMeSave');
	  let aboutMeHeading = document.getElementById('aboutMeHeading'), addSection = document.getElementById('addSection');
	  let aboutMePreview = document.getElementById('aboutMePreview');
	  let aboutMe = myProfile.about.subText || []; //store an array of heading/details pair objects
	  let idx = aboutMe.length; //index of header/details group being edited
	  let header, details;
	  //initialize with existing data from local storage
	  mainHeader.textContent = myProfile.about.mainHeader || '';
	  mainHeaderIn.value = myProfile.about.mainHeader || '';
	  for(var i=0; i < idx; i++){
	    newSection(i);
	    document.getElementById('header' + i).textContent = aboutMe[i].heading;
	    document.getElementById('details' + i).textContent = aboutMe[i].details;
	  }
	  //prep for adding input
	  newSection(idx);
	  
	  aboutMeSave.addEventListener('click', function(){
	    myProfile.about = aboutMe;
	    let data = {profileId: myProfile.profileId, aboutMe: aboutMe, aboutMeHeader: mainHeader.textContent};
	    doAjax.ajaxPostJson('/saveProfile', data, function(err, data){
	      if(err) alert('There was a problem saving your changes ' + err);
	      else{
	        alert('About you data successfully updated');
	        window.localStorage.setItem('myProfile', JSON.stringify(myProfile));
	      }
	    }, localStorage.getItem('DRCToken'));
	  });

	  //bind input to output fields
	  mainHeaderIn.addEventListener('keyup', function(){
	    mainHeader.textContent = mainHeaderIn.value;
	  });
	  aboutMeHeading.addEventListener('keyup', function(){
	    header.textContent = aboutMeHeading.value;
	  });
	  aboutMeText.addEventListener('keyup', function(){
	    details.textContent = aboutMeText.value;
	  });
	  
	  addSection.addEventListener('click', function(){
	    idx = aboutMe.length;
	    aboutMe.push({heading: aboutMeHeading.value, details: aboutMeText.value});
	    newSection(idx);
	    aboutMeHeading.value = '';
	    aboutMeText.value = '';
	    idx++
	  });
	  
	  function newSection(idx){
	    header = document.createElement('h3');
	    details = document.createElement('p');
	    header.setAttribute('id', 'header' + idx);
	    details.setAttribute('id', 'details' + idx);
	    aboutMePreview.appendChild(header);
	    aboutMePreview.appendChild(details);
	  }
	  
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * profileCurrent
	 * Created by dcorns on 5/23/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	const doAjax = __webpack_require__(2);
	let current;
	module.exports = function profileCurrent(){
	  let myProfile = JSON.parse(localStorage.getItem('myProfile'));
	  current = myProfile.current;
	  //current = [{start: new Date(), activity: 'Test Activity', end: new Date()}];
	  let els = document.querySelectorAll('#profile-content > [id]');
	  for (var ii = 0; ii < els.length; ii++){
	    configureEl(els[ii]);
	  }
	};
	//Declare all functions scoped Variables
	let tbl, newActivity = {start:'', activity: '', end: ''};
	//initialize functionality for dom nodes
	const configureEl = (el) => {
	  switch (el.id){
	    case 'currentItemsList':
	      tbl = el;
	      if(current && current.length > 0){
	        prepTable(tbl, current);
	      }
	      break;
	    case 'startDate':
	      el.addEventListener('change', function(e){
	        newActivity.start = e.target.value;
	        console.log(newActivity.start);
	      });
	      break;
	    case 'activity':
	      el.addEventListener('keyup', function(e){
	        newActivity.activity = e.target.value;
	        console.log(newActivity.activity);
	      });
	      break;
	    case 'endDate':
	      el.addEventListener('change', function(e){
	        newActivity.end = e.target.value;
	        console.log(newActivity.end);
	      });
	      break;
	    case 'addItem':
	      el.addEventListener('click', function(){
	        current.push(newActivity);
	        if(current.length < 2){
	          prepTable(tbl, current);
	        }
	        else{
	          addTableData(newActivity, ['start', 'activity', 'end'], tbl);
	        }
	      });
	      break;
	    case 'updateItem':
	      break;
	    case 'removeItem':
	      break;
	    default:
	      break;
	  }
	}

	//Take an array of data objects and create table headers based on keys and data table rows based on values and insert data into rows, then append to tblNode
	let prepTable = (tblNode, tblData) => {
	  console.time('prepTable');
	  const len = tblData.length;
	  //create headers based on property names
	  let tblHeader = document.createElement('tr');
	  let dataKeys = [];
	  for (var prop in tblData[0]){
	    if(tblData[0].hasOwnProperty(prop)){
	      dataKeys.push(prop);
	      addHeaderRowCell(prop, tblHeader);
	    }
	  }
	  tblNode.appendChild(tblHeader);
	    for(var i2 = 0; i2 < len; i2++){
	      addTableData(tblData[i2], dataKeys, tblNode);
	    }
	  console.timeEnd('prepTable');
	}

	//ads a table row to tblNode containing obj data who's keys match the provided dataKeys
	let addTableData = (obj, dataKeys, tblNode) => {
	  console.time('addTableData');
	  let tr = document.createElement('tr');
	  for(var i3 = 0; i3 < dataKeys.length; i3++){
	    let td = document.createElement('td');
	    td.textContent = obj[dataKeys[i3]];
	    tr.appendChild(td);
	  }
	  tblNode.appendChild(tr);
	  console.timeEnd('addTableData');
	}

	//Capitalize the first letter of headerText and add th node with the headerText to rowNode
	let addHeaderRowCell = (headerText, rowNode) => {
	  let th = document.createElement('th');
	  th.textContent = headerText[0].toUpperCase() + headerText.slice(1);
	  rowNode.appendChild(th);
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * exampleData
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = {
	  technologies: ['JavaScript', 'Angular', 'ES6', 'JQuery', 'Node', 'C#', '.Net', 'MSSql', 'MongoDB', 'Backbone', 'Python', 'SocketIO', 'Express'],
	  repos: [{
	    name: 'exploreSocketIO',
	    readme: 'https://raw.githubusercontent.com/dcorns/exploreSocketIO/master/README.md',
	    href: 'https://github.com/dcorns/exploreSocketIO'
	  }],
	  specifics: ['ServerSide', 'socket.on', 'socket.emit', 'express.get', 'response.sendFile'],
	  examples:[{
	    fileName: 'areYouDeaf.js',
	    rawTextLink: 'https://raw.githubusercontent.com/dcorns/exploreSocketIO/master/examples/areYouDeaf.js',
	    specificsID: [0, 1, 2, 3, 4],
	    technologiesID: [0, 11, 12],
	    repoID: 0
	  }
	  ]
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * exampleToolsData
	 * Created by dcorns on 1/18/16
	 * Copyright © 2016 Dale Corns
	 */
	'use strict';
	module.exports = {
	  repos: ['dalecorns.com'],
	  WebStorm: [''],
	  AndroidStudio: [''],
	  VisualStudio: [''],
	  Eclipse: [''],
	  QTCreator: [''],
	  gulp: [{filename: 'gulpfile.js', repoID: 0}],
	  grunt: ['']
	};

/***/ }
/******/ ]);