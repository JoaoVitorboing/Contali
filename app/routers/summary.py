from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.db.session import get_db
from app.models.transaction import Transaction

router = APIRouter(prefix="/summary", tags=["summary"])


def calcular_totais_do_mes(db: Session, mes: int, ano: int):
    total_entradas = (
        db.query(func.sum(Transaction.valor))
        .filter(
            Transaction.tipo == "entrada",
            extract("month", Transaction.data) == mes,
            extract("year", Transaction.data) == ano,
        )
        .scalar() or 0
    )

    total_saidas = (
        db.query(func.sum(Transaction.valor))
        .filter(
            Transaction.tipo == "saída",
            extract("month", Transaction.data) == mes,
            extract("year", Transaction.data) == ano,
        )
        .scalar() or 0
    )

    return {
        "mes": mes,
        "ano": ano,
        "total_entradas": total_entradas,
        "total_saidas": total_saidas,
        "saldo": total_entradas - total_saidas,
    }


def calcular_mes_anterior(mes: int, ano: int):
    if mes == 1:
        return 12, ano - 1
    return mes - 1, ano


@router.get("/")
def resumo_mensal(
    mes: int = Query(..., ge=1, le=12),
    ano: int = Query(...),
    db: Session = Depends(get_db),
):
    mes_anterior, ano_anterior = calcular_mes_anterior(mes, ano)

    dados_atual = calcular_totais_do_mes(db, mes, ano)
    dados_anterior = calcular_totais_do_mes(db, mes_anterior, ano_anterior)

    if dados_anterior["total_saidas"] > 0:
        variacao_gastos_percentual = round(
            ((dados_atual["total_saidas"] - dados_anterior["total_saidas"])
             / dados_anterior["total_saidas"]) * 100,
            2,
        )
    else:
        variacao_gastos_percentual = None

    return {
        **dados_atual,
        "mes_anterior": mes_anterior,
        "ano_anterior": ano_anterior,
        "total_saidas_mes_anterior": dados_anterior["total_saidas"],
        "variacao_gastos_percentual": variacao_gastos_percentual,
    }


@router.get("/historico")
def historico_meses(
    quantidade_meses: int = Query(6, ge=1, le=24),
    mes: int = Query(..., ge=1, le=12),
    ano: int = Query(...),
    db: Session = Depends(get_db),
):
    resultado = []
    mes_atual, ano_atual = mes, ano

    for _ in range(quantidade_meses):
        resultado.append(calcular_totais_do_mes(db, mes_atual, ano_atual))
        mes_atual, ano_atual = calcular_mes_anterior(mes_atual, ano_atual)

    resultado.reverse()
    return resultado