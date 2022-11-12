"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var express = require("express");
var router = express.Router(); //objeto poder ingresar rutas
var St_RepairSchema = require("../models/status/St_Repair");
var St_DamagedSchema = require("../models/status/St_Damaged");
var AssetSchema = require("../models/Asset");
var verifyToken = require("../controllers/verifyToken");
var path = require("path");
var fs = require("fs");
var _require = require("../utils/generateTime"),
  generateTime = _require.generateTime;
var _require2 = require("../utils/generateNewTag"),
  generateNewTag = _require2.generateNewTag;
var _require3 = require("../utils/incrementCounter"),
  incrementCounter = _require3.incrementCounter;
var verifyRoles = require("../controllers/verifyRoles");
router.post("/reparar", verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, idAsset, tag, supplier, dateRepair, ultimateStat, _yield$generateNewTag, newTag, auxTag, _generateTime, newDate, newDateUrl, invoice_url, st_repair, invoice, rutaFactura;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, idAsset = _req$body.idAsset, tag = _req$body.tag, supplier = _req$body.supplier, dateRepair = _req$body.dateRepair, ultimateStat = _req$body.ultimateStat; //obtengo los datos de la pagina
            _context2.prev = 1;
            _context2.next = 4;
            return generateNewTag(tag);
          case 4:
            _yield$generateNewTag = _context2.sent;
            newTag = _yield$generateNewTag.newTag;
            auxTag = _yield$generateNewTag.auxTag;
            _generateTime = generateTime(dateRepair), newDate = _generateTime.newDate, newDateUrl = _generateTime.newDateUrl;
            invoice_url = newDateUrl + "_" + newTag + ".pdf";
            st_repair = new St_RepairSchema({
              idAsset: idAsset,
              dateRepair: newDate,
              supplier: supplier,
              invoice_url: invoice_url,
              ultimateStat: ultimateStat
            });
            if (!req.files) {
              _context2.next = 16;
              break;
            }
            if (!(!req.files || Object.keys(req.files).length === 0)) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              status: "Error PDF"
            }));
          case 13:
            invoice = req.files.invoice;
            rutaFactura = path.join(__dirname, "..", "respaldos", "/", "reparaciones/factura/");
            invoice.mv(rutaFactura + invoice_url, /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(err) {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }
                        throw "ErrorPdf";
                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
          case 16:
            _context2.next = 18;
            return st_repair.save();
          case 18:
            _context2.next = 20;
            return incrementCounter(tag, auxTag);
          case 20:
            res.status(200).json({
              ok: true,
              status: "Reparación con Exito"
            });
            _context2.next = 31;
            break;
          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            if (!(_context2.t0.name === "ValidationError")) {
              _context2.next = 28;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              status: "ERROR AL REGISTRAR REPARACIÓN"
            }));
          case 28:
            if (!(_context2.t0.name === "ErrorPdf")) {
              _context2.next = 30;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              status: "ERROR AL REGISTRAR PDF"
            }));
          case 30:
            return _context2.abrupt("return", res.status(500).json({
              ok: false,
              status: "ERROR AL MANDAR REPARACIÓN"
            }));
          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 23]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/detalles_reparacion/:id", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var st_repair;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return St_RepairSchema.find({
              idAsset: req.params.id
            }).sort({
              _id: -1
            }).limit(1).populate({
              path: "idAsset"
            }).populate({
              path: 'supplier',
              select: 'name'
            });
          case 3:
            st_repair = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(st_repair[0]));
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/ViewPdf/:invoice_url", verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var ruta;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            ruta = path.join(__dirname, "..", "respaldos", "/", "reparaciones/factura/", "".concat(req.params.invoice_url));
            res.status(200).download(ruta, function (err) {
              if (err) {
                return res.status(404).json("Pdf no encontrado");
              }
            });
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/updateInvoice/", verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var img, rutaFactura;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(!req.files || Object.keys(req.files).length === 0)) {
              _context6.next = 2;
              break;
            }
            return _context6.abrupt("return", res.status(400).json({
              status: "Error PDF"
            }));
          case 2:
            img = req.files.file;
            rutaFactura = path.join(__dirname, "..", "respaldos", "/", "reparaciones/factura/");
            img.mv(rutaFactura + img.name, /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(err) {
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 2;
                          break;
                        }
                        throw "ErrorPdf";
                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
              return function (_x10) {
                return _ref6.apply(this, arguments);
              };
            }());
            return _context6.abrupt("return", res.status(200).json({
              status: "PDF Actualizado"
            }));
          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}());

/* A PARTIR DE AQUI USO 2 O MAS COLLECCIONES */
router.get("/returnStatus/:id", verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var st_repair, st_damaged;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return St_RepairSchema.find({
              idAsset: req.params.id
            }).sort({
              _id: -1
            }).limit(1);
          case 3:
            st_repair = _context7.sent;
            if (!(st_repair[0].ultimateStat !== "STOCK")) {
              _context7.next = 12;
              break;
            }
            _context7.next = 7;
            return St_DamagedSchema.find({
              idAsset: req.params.id
            }).sort({
              _id: -1
            }).limit(1);
          case 7:
            st_damaged = _context7.sent;
            _context7.next = 10;
            return AssetSchema.findByIdAndUpdate(req.params.id, {
              status: st_damaged[0].ultimateStat
            }, {
              runValidators: true
            });
          case 10:
            _context7.next = 14;
            break;
          case 12:
            _context7.next = 14;
            return AssetSchema.findByIdAndUpdate(req.params.id, {
              status: "STOCK"
            }, {
              runValidators: true
            });
          case 14:
            return _context7.abrupt("return", res.status(200).json({
              status: "Cambio con exito"
            }));
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
router.get("/returnHistory/:id", verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var st_repair, st_damaged;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return St_RepairSchema.find({
              idAsset: req.params.id
            }).sort({
              _id: -1
            }).limit(1);
          case 3:
            st_repair = _context8.sent;
            if (!(st_repair[0].ultimateStat !== "STOCK")) {
              _context8.next = 11;
              break;
            }
            _context8.next = 7;
            return St_DamagedSchema.find({
              idAsset: req.params.id
            }).sort({
              _id: -1
            }).limit(1);
          case 7:
            st_damaged = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              status: st_damaged[0]
            }));
          case 11:
            return _context8.abrupt("return", res.status(200).json({
              ok: false
            }));
          case 12:
            _context8.next = 18;
            break;
          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
module.exports = router;