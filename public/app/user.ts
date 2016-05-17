export class User {
  local            : {
      email        : String,
      password     : String,
  };
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  };
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  };
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  };
    simpletodo     : {
      fixed: Boolean,
      dragHandle:String,
      col:  Number,
      row : Number,
      sizex : Number,
      sizey : Number,
      width : Number,
      height : Number
    };
    twitchchat     : {
      fixed: Boolean,
      dragHandle:String,
      col:  Number,
      row : Number,
      sizex : Number,
      sizey : Number,
      width : Number,
      height : Number
    };
    twitchplayer     : {
      fixed: Boolean,
      dragHandle:String,
      col:  Number,
      row : Number,
      sizex : Number,
      sizey : Number,
      width : Number,
      height : Number
    };
    youtubeplayer     : {
      fixed: Boolean,
      dragHandle:String,
      col:  Number,
      row : Number,
      sizex : Number,
      sizey : Number,
      width : Number,
      height : Number
    };
    quicknote     : {
      fixed: Boolean,
      dragHandle:String,
      col:  Number,
      row : Number,
      sizex : Number,
      sizey : Number,
      width : Number,
      height : Number
    };
}
