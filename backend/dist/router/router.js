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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/products', (req, res) => {
    const amount = req.query.amount || 1000;
    const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    LIMIT ${amount} 
  `;
    mysql_1.default.execQuery(query, (err, products) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                products
            });
        }
    });
});
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.instance.connection.escape(id);
    const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE id = ${escapedId}
  `;
    mysql_1.default.execQuery(query, (err, product) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                product: product[0]
            });
        }
    });
});
router.get('/products/search/:keyword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.params.keyword;
    const modKey = "'%" + keyword + "%'";
    const searchQuery = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
    OR titulo like (${modKey})
    LIMIT 5
  `;
    const findWord = `
    EXISTS(
      SELECT * 
      FROM products_search_log
      WHERE tags LIKE LOWER (${modKey})
      OR titulo like (${modKey})
      AND NOT EXISTS (
        SELECT * 
        FROM tags_search_log
        WHERE tags LIKE LOWER (${modKey})
        OR titulo like (${modKey})
      )
    )
  `;
    const findAndUpdateQuery = `
    EXSITS(
      UPDATE products_search_log
      SET @count := +1 as count
      WHERE products LIKE LOWER(${modKey})
      AND NOT EXISTS (INSERT INTO product_search_log (name, count) VALUES ( ${modKey} , +1 ); )
    )
   
`;
    const searchAndUpdate = (query) => {
        mysql_1.default.execQuery(query, (err, product) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            else {
                res.json({
                    ok: true,
                    keyword,
                    product: product[0]
                });
            }
        });
    };
    const checkquery = searchAndUpdate(findWord);
    // if (checkquery.length >= 1) {
    //   console.log('yay')
    // }
    searchAndUpdate(searchQuery);
}));
exports.default = router;
