# Órbita Bank — Dashboard

Tela de **Dashboard** de uma fintech fictícia (**Órbita Bank** - conta digital com cartão, Pix e investimentos), desenvolvida como atividade avaliativa do curso de **Análise e Desenvolvimento de Sistemas (FIAP)**.

Construída com **HTML + Tailwind CSS** (CSS compilado estático), responsiva e **100% funcional offline**.

## ✨ Funcionalidades da tela

- **Saldo disponível** em destaque, com resumo de entradas e saídas do mês.
- **Ações rápidas:** Pix, Transferir, Pagar e Recarga.
- **Extrato** com últimas movimentações (entradas em verde, saídas em cinza).
- **Coluna lateral** (desktop) com cartão de crédito, fatura atual e investimentos.
- **Navegação inferior** no mobile.

## 🎨 Identidade visual (Fase 2)

- **Paleta:** Navy (`#0a1a2f` → `#2f4f7a`) como cor principal + **Teal** (`#2dd4bf`) como destaque/ação.
- **Tipografia:** stack de fontes do sistema (`font-sans`), para não depender de rede.

## 🛠️ Tecnologias

- HTML5 semântico
- Tailwind CSS v4 (via **Standalone CLI**, sem Node/npm)
- Ícones em SVG inline (sem dependências externas)
- **Sem JavaScript de aplicação**

## 📂 Estrutura

```
projeto-fintech/
├── index.html      # a tela (marcação + classes Tailwind)
├── input.css       # CSS de origem (@import "tailwindcss" + tema navy)
├── output.css      # CSS compilado e minificado (versionado)
├── img/
│   └── logo.svg    # logotipo (caminho relativo)
├── README.md
└── .gitignore      # ignora o binário do Tailwind; mantém o output.css
```

## ▶️ Como visualizar

Basta abrir o `index.html` no navegador - **não precisa de internet**.
Para evitar restrições de `file://`, você também pode servir a pasta localmente:

```bash
# Python (já instalado na máquina de desenvolvimento)
python -m http.server 8080
# depois abra http://localhost:8080
```

## 🔁 Como recompilar o CSS (opcional)

O `output.css` já está pronto e versionado. Para regenerá-lo após mudar classes no HTML:

```bash
# 1) Baixe o Tailwind Standalone CLI para o seu SO (ex.: Windows x64):
#    tailwindcss-windows-x64.exe  ->  renomeie para tailwindcss.exe

# 2) Compile (lê o input.css, escaneia o index.html e gera o output.css minificado):
./tailwindcss.exe -i input.css -o output.css --minify
```

> ⚠️ O projeto **não usa o CDN do Tailwind**. O CSS é compilado estaticamente,
> por isso a página funciona sem conexão com a internet.

## 📱 Responsividade

Layout *mobile-first* com breakpoints `sm` / `md` / `lg`, testado de **375px** (celular)
até desktop, sem rolagem horizontal.

---

Projeto acadêmico, FIAP / ADS.
