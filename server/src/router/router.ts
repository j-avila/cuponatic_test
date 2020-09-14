import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";

const router = Router();

router.get("/products", (req: Request, res: Response) => {
  const amount = req.query.amount || 1000;

  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    ORDER by vendidos DESC
    LIMIT ${amount} 
  `;

  MySQL.execQuery(query, (err: any, products: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        products,
      });
    }
  });
});

router.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const escapedId = MySQL.instance.connection.escape(id);

  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE id = ${escapedId}
  `;

  MySQL.execQuery(query, (err: any, product: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        product: product[0],
      });
    }
  });
});

router.get("/products/search/:keyword", async (req: Request, res: Response) => {
  const keyword = req.params.keyword;
  const modKey = "'%" + keyword + "%'";
  const searchProcedure = `CALL searchProducts(${modKey})`

  const queryHandler = (query: string) => {
    let arr = [];
    MySQL.execQuery(query, (err: any, products: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          keyword,
          product: products[0],
        });
        arr = products;
      }
    });
  };

  queryHandler(searchProcedure);

  // setTimeout(() => queryHandler(countQuery), 8000)
  console.log('anoted!')
});

router.get("/count", (req: Request, res: Response) => {
  const product = MySQL.instance.connection.escape(req.query.key);
  const product_id = MySQL.instance.connection.escape(req.query.id);

  const counterProcedure = `CALL findAndCount(${product}, ${product_id})`

  const queryHandler = (query: string) => {
    MySQL.execQuery(query, (err: any, products: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          product: products,
        });
      }
    });
  };

  queryHandler(counterProcedure);
});

router.get("/popular", (req: Request, res: Response) => {
  const preAmount = req.query.amount || 100
  const amount = MySQL.instance.connection.escape(preAmount);
  const getBestSellers = `CALL getPopular(${amount})`;

  const queryHandler = (query: string) => {
    MySQL.execQuery(query, (err: any, bestSellers: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          bestSellers: bestSellers[0],
        });
      }
    });
  };

  queryHandler(getBestSellers);
});

export default router
