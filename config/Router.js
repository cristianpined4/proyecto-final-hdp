/*!
  * Route 1.0.2
  * Copyright 2021 - Cristian Pineda <cristian.pineda.1997@outlook.com>
  * Licensed under MIT
*/

"use strict";

class Route {
    constructor(){
      this.params = this.Params();
      this.hash = this.Hash();
    }

    params = {};
    home = location.origin;
    actualPage = location.href;
    path = location.pathname;
    hash = {};

    Reload(){
      location.reload(true);
    }

    GoTo(path){
      location.replace(path);
    }

    GoToWith(path,data){
      if(this.actualPage != `${this.home}/${path}`){
        localStorage.setItem("RouteGoToWith",JSON.stringify({data,path}));
        this.GoTo(path);
      }
    }

    GetData(){
      let res = "";
      res = JSON.parse(localStorage.getItem("RouteGoToWith"));
      if(this.actualPage == `${this.home}/${res.path}`){
        localStorage.removeItem("RouteGoToWith");
      }
      return res.data;
    }

    Hash(){
        let a = location.hash,size = 0;
        a = a.substr(1,a.length).replace(/[?&=]/g,':').split(':');
        const b = {};
        for (let i = 0; i < (a.length-1);i++) {
            b[a[i]] = a[(i+1)];
            i++;
            size++;
        }
        return {...b,size};
    }

    Params(){
        let a = location.search,size = 0;
        a = a.substr(1,a.length).replace(/[?&=]/g,':').split(':');
        const b = {};
        for (let i = 0; i < (a.length-1);i++) {
            b[a[i]] = a[(i+1)];
            i++;
            size++;
        }
        return {...b,size};
    }
}

export default Route;
