export = index;
declare function index(patterns: any, options: any): any;
declare namespace index {
  function generateGlobTasks(patterns: any, taskOptions: any): any;
  function gitignore(options: any): any;
  namespace gitignore {
    function sync(options: any): any;
  }
  function hasMagic(patterns: any, options: any): void;
  function sync(patterns: any, options: any): any;
}
