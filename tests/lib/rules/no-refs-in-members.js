/**
 * @fileoverview Prevent references within members property initialization
 * @author rsternagel
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-refs-in-members"),
    RuleTester = require("../../../../eslint/lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-refs-in-members", rule, {

  valid: [
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { myMember: 1, myMember2: true } });'
    }
  ],

  invalid: [
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { myMember: new Fugu() } });',
      errors: [ { message: "Do not initialize member \"myMember\" with new operator" } ]
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { myMember: {} } });',
      errors: [ { message: "Do not initialize member \"myMember\" with object literal" } ]
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { myMember: [] } });',
      errors: [ { message: "Do not initialize member \"myMember\" with array literal" } ]
    }
  ]

});
