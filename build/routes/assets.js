"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var express = require('express');
var router = express.Router(); //objeto poder ingresar rutas
var AssetSchema = require("../models/Asset");
var verifyToken = require("../controllers/verifyToken");
var verifyRoles = require("../controllers/verifyRoles");
router.get('/ver_equipos', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var isAsset, asset, newEquipment_type, assets;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            isAsset = req.query.isAsset || 0; // 1 = true, 0 = false
            asset = null;
            newEquipment_type = {};
            if (!!req.user_type_equipments) {
              newEquipment_type = {
                equipment_type: {
                  $in: req.user_type_equipments
                }
              };
            }
            if (isAsset == 1) {
              asset = {
                status: {
                  $nin: ["BAJA" /*, "ROBADO"*/]
                }
              };
            } else {
              asset = {
                status: {
                  $in: ["BAJA" /*, "ROBADO"*/]
                }
              };
            }
            _context.next = 8;
            return AssetSchema.find({
              $and: [newEquipment_type, asset]
            }).lean().populate({
              path: 'supplier',
              select: 'name'
            }).populate({
              path: 'equipment_type',
              select: 'name'
            }).populate({
              path: 'asset_company',
              select: 'name'
            }).populate({
              path: 'location',
              select: 'name'
            }).sort({
              _id: -1
            });
          case 8:
            assets = _context.sent;
            return _context.abrupt("return", res.status(200).json(assets));
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/ver_editar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var find;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return AssetSchema.findById(req.params.id).populate('mobileDetail').populate('desktopDetail');
          case 3:
            find = _context2.sent;
            if (find) {
              _context2.next = 6;
              break;
            }
            throw "NOT FOUND";
          case 6:
            res.status(200).json(find);
            _context2.next = 14;
            break;
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            if (!(_context2.t0 === "NOT FOUND")) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 13:
            return _context2.abrupt("return", res.status(500).send({
              status: 'ERROR ALGO SALIO MAL'
            }));
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/ver_detalles_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var find;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return AssetSchema.findById(req.params.id).populate({
              path: 'supplier',
              select: 'name'
            }).populate({
              path: 'equipment_type',
              select: 'name'
            }).populate({
              path: 'asset_company',
              select: 'name'
            }) //encuentra y borra documento
            .populate({
              path: 'location',
              select: 'name'
            }) //encuentra y borra documento
            .populate('mobileDetail').populate('desktopDetail');
          case 3:
            find = _context3.sent;
            if (find) {
              _context3.next = 6;
              break;
            }
            throw "NOT FOUND";
          case 6:
            res.status(200).json(find);
            _context3.next = 15;
            break;
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            if (!(_context3.t0 === "NOT FOUND")) {
              _context3.next = 13;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 13:
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).send({
              status: 'ERROR ALGO SALIO MAL'
            }));
          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/agregar_equipo', verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, tag, make, model, serial_number, asset_code, asset_type, equipment_type, status, invoice, supplier, asset_company, location, datePurchase, observation, mobileDetail, desktopDetail, Asset;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, tag = _req$body.tag, make = _req$body.make, model = _req$body.model, serial_number = _req$body.serial_number, asset_code = _req$body.asset_code, asset_type = _req$body.asset_type, equipment_type = _req$body.equipment_type, status = _req$body.status, invoice = _req$body.invoice, supplier = _req$body.supplier, asset_company = _req$body.asset_company, location = _req$body.location, datePurchase = _req$body.datePurchase, observation = _req$body.observation, mobileDetail = _req$body.mobileDetail, desktopDetail = _req$body.desktopDetail; //obtengo los datos de la pagina
            console.log(req.body);
            Asset = new AssetSchema({
              tag: tag,
              make: make,
              model: model,
              serial_number: serial_number,
              asset_code: asset_code,
              asset_type: asset_type,
              equipment_type: equipment_type,
              status: status,
              invoice: invoice,
              supplier: supplier,
              asset_company: asset_company,
              location: location,
              datePurchase: datePurchase,
              dateRegistration: new Date(),
              observation: observation,
              mobileDetail: mobileDetail,
              desktopDetail: desktopDetail
            });
            console.log(Asset);
            _context4.prev = 4;
            _context4.next = 7;
            return Asset.save();
          case 7:
            return _context4.abrupt("return", res.status(200).json({
              status: 'Equipo Guardado'
            }));
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](4);
            console.log(_context4.t0);
            if (!(_context4.t0.name === "ValidationError")) {
              _context4.next = 15;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              status: 'ERROR AL REGISTRAR EL EQUIPO'
            }));
          case 15:
            return _context4.abrupt("return", res.status(500).send({
              status: 'ERROR AL AGREGAR EL EQUIPO'
            }));
          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 10]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.put('/editar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, tag, make, model, serial_number, asset_code, asset_type, equipment_type, status, invoice, supplier, asset_company, location, datePurchase, dateDrop, observation, mobileDetail, desktopDetail, newAsset, find;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, tag = _req$body2.tag, make = _req$body2.make, model = _req$body2.model, serial_number = _req$body2.serial_number, asset_code = _req$body2.asset_code, asset_type = _req$body2.asset_type, equipment_type = _req$body2.equipment_type, status = _req$body2.status, invoice = _req$body2.invoice, supplier = _req$body2.supplier, asset_company = _req$body2.asset_company, location = _req$body2.location, datePurchase = _req$body2.datePurchase, dateDrop = _req$body2.dateDrop, observation = _req$body2.observation, mobileDetail = _req$body2.mobileDetail, desktopDetail = _req$body2.desktopDetail; //obtengo los datos que me mandan
            console.log(req.body);
            newAsset = {
              tag: tag,
              make: make,
              model: model,
              serial_number: serial_number,
              asset_code: asset_code,
              asset_type: asset_type,
              equipment_type: equipment_type,
              status: status,
              invoice: invoice,
              supplier: supplier,
              asset_company: asset_company,
              location: location,
              datePurchase: datePurchase,
              dateDrop: dateDrop,
              observation: observation,
              mobileDetail: mobileDetail,
              desktopDetail: desktopDetail
            }; //creo una nueva tarea
            _context5.prev = 3;
            _context5.next = 6;
            return AssetSchema.findByIdAndUpdate(req.params.id, newAsset, {
              runValidators: true
            });
          case 6:
            find = _context5.sent;
            if (find) {
              _context5.next = 9;
              break;
            }
            throw "NOT FOUND";
          case 9:
            return _context5.abrupt("return", res.status(200).json({
              status: 'Equipo Actualizado'
            }));
          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](3);
            if (!(_context5.t0 === "NOT FOUND")) {
              _context5.next = 16;
              break;
            }
            return _context5.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 16:
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(500).send({
              status: 'ERROR AL ACTUALIZAR EL EQUIPO'
            }));
          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 12]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.put('/cambioState_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, status, location, newStatus, find;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, status = _req$body3.status, location = _req$body3.location;
            newStatus = {
              status: status,
              location: location
            };
            _context6.prev = 2;
            _context6.next = 5;
            return AssetSchema.findByIdAndUpdate(req.params.id, newStatus, {
              runValidators: true
            });
          case 5:
            find = _context6.sent;
            if (find) {
              _context6.next = 8;
              break;
            }
            throw "NOT FOUND";
          case 8:
            return _context6.abrupt("return", res.status(200).json({
              status: 'Estatus Actualizado'
            }));
          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](2);
            if (!(_context6.t0 === "NOT FOUND")) {
              _context6.next = 15;
              break;
            }
            return _context6.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 15:
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).send({
              status: 'ERROR AL ACTUALIZAR EL ESTATUS'
            }));
          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router["delete"]('/eliminar_equipo/:id', verifyToken, verifyRoles(["admin", "user_type_equipment"]), /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var find;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return AssetSchema.findByIdAndRemove(req.params.id);
          case 3:
            find = _context7.sent;
            if (find) {
              _context7.next = 6;
              break;
            }
            throw "NOT FOUND";
          case 6:
            res.status(200).json({
              status: 'Equipo Eliminado'
            });
            _context7.next = 14;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            if (!(_context7.t0 === "NOT FOUND")) {
              _context7.next = 13;
              break;
            }
            return _context7.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 13:
            return _context7.abrupt("return", res.status(500).send({
              status: 'ERROR AL ELIMINAR EL EQUIPO'
            }));
          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/detalles_equipos', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var assets, stock, asignado, prestamo, reparacion, robado, baja;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return AssetSchema.find().count();
          case 3:
            assets = _context8.sent;
            _context8.next = 6;
            return AssetSchema.find({
              'status': 'STOCK'
            }).count();
          case 6:
            stock = _context8.sent;
            _context8.next = 9;
            return AssetSchema.find({
              'status': 'ASIGNADO'
            }).count();
          case 9:
            asignado = _context8.sent;
            _context8.next = 12;
            return AssetSchema.find({
              'status': 'PRESTAMO'
            }).count();
          case 12:
            prestamo = _context8.sent;
            _context8.next = 15;
            return AssetSchema.find({
              'status': 'REPARACIÓN'
            }).count();
          case 15:
            reparacion = _context8.sent;
            _context8.next = 18;
            return AssetSchema.find({
              'status': 'ROBADO'
            }).count();
          case 18:
            robado = _context8.sent;
            _context8.next = 21;
            return AssetSchema.find({
              'status': 'BAJA'
            }).count();
          case 21:
            baja = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              data: {
                assets: assets,
                stock: stock,
                asignado: asignado,
                prestamo: prestamo,
                reparacion: reparacion,
                robado: robado,
                baja: baja
              }
            }));
          case 25:
            _context8.prev = 25;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(500).send({
              status: "ERROR ALGO SALIO MAL"
            }));
          case 29:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 25]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.get('/ver_tipo_equipo/:equipment_type', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var find;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return AssetSchema.find({
              equipment_type: req.params.equipment_type
            }).populate({
              path: 'supplier',
              select: 'name'
            }).populate({
              path: 'equipment_type',
              select: 'name'
            }).populate({
              path: 'asset_company',
              select: 'name'
            }) //encuentra y borra documento
            .populate({
              path: 'location',
              select: 'name'
            }) //encuentra y borra documento
            .populate('mobileDetail').populate('desktopDetail');
          case 3:
            find = _context9.sent;
            if (find) {
              _context9.next = 6;
              break;
            }
            throw "NOT FOUND";
          case 6:
            res.status(200).json(find);
            _context9.next = 15;
            break;
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            if (!(_context9.t0 === "NOT FOUND")) {
              _context9.next = 13;
              break;
            }
            return _context9.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 13:
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).send({
              status: 'ERROR ALGO SALIO MAL'
            }));
          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.post('/ver_tipos_equipos/', verifyToken, verifyRoles(["admin", "user_type_equipment", "user_read"]), /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var find;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return AssetSchema.find({
              $and: [{
                equipment_type: {
                  $in: req.body.type
                }
              }]
            }).populate({
              path: 'supplier',
              select: 'name'
            }).populate({
              path: 'equipment_type',
              select: 'name'
            }).populate({
              path: 'asset_company',
              select: 'name'
            }) //encuentra y borra documento
            .populate({
              path: 'location',
              select: 'name'
            }) //encuentra y borra documento
            .populate('mobileDetail').populate('desktopDetail').sort({
              equipment_type: -1
            });
          case 3:
            find = _context10.sent;
            if (find) {
              _context10.next = 6;
              break;
            }
            throw "NOT FOUND";
          case 6:
            res.status(200).json(find);
            _context10.next = 15;
            break;
          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](0);
            if (!(_context10.t0 === "NOT FOUND")) {
              _context10.next = 13;
              break;
            }
            return _context10.abrupt("return", res.status(404).json({
              status: 'ERROR EQUIPO NO ENCONTRADO'
            }));
          case 13:
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(500).send({
              status: 'ERROR ALGO SALIO MAL'
            }));
          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
module.exports = router;