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

  const searchQuery = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
    OR titulo LIKE (${modKey})
    LIMIT 5
  `;

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
          product: products,
        });
        arr = products;
      }
    });
  };

  queryHandler(searchQuery);
});

router.post("/count", (req: Request, res: Response) => {
  const product = MySQL.instance.connection.escape(req.query.key);
  const product_id = MySQL.instance.connection.escape(req.query.id);
  console.log(product, product_id);

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

router.get("/logs", (req: Request, res: Response) => {
  const amount = req.query.amount || 1000;
  const getLogs = `CALL getlogs(${amount})`;

  const queryHandler = (query: string) => {
    MySQL.execQuery(query, (err: any, logs: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          logs: logs,
        });
      }
    });
  };

  queryHandler(getLogs);
});

export default router;
