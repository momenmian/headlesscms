"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class WebService {
    /**
     * Handle GET requests to the web service.
     *
     * This will render an EJS template with the title
     * 'Web Service || GET method'.
     *
     * @param {Request} req Express Request object
     * @param {Response} res Express Response object
     * @param {NextFunction} next Express NextFunction object
     * @returns {void}
     */
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('index', { title: `Web Service || GET method` });
        });
    }
    /**
     * Handle POST requests to the web service.
     *
     * This will render an EJS template with the title
     * 'Web Service || POST method'.
     *
     * @param {Request} req Express Request object
     * @param {Response} res Express Response object
     * @param {NextFunction} next Express NextFunction object
     * @returns {void}
     */
    static post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('index', { title: `Web Service || POST method` });
        });
    }
}
exports.default = WebService;
