# CANTA Talentos — formulário ligado à planilha + publicação na Vercel

Destino das inscrições (já configurado no código):
- Planilha: https://docs.google.com/spreadsheets/d/10-stOAE7eN2d0QbJlPpxGZtOYU4RvzyN5zKxnydmp4U
- Pasta dos anexos: https://drive.google.com/drive/folders/1cvMGwVP0pJ50-PDexMKhQ5LA0zWodk3R

Não precisa de conta de serviço nem de Google Cloud. Quem salva é um pequeno programa que fica dentro da sua própria planilha.

## Passo 1 — Colocar o programa na planilha (5 min)
1. Abra a planilha > menu **Extensões > Apps Script**.
2. Apague o que estiver lá e cole todo o conteúdo de `google/Codigo.gs`. Clique em **Salvar**.
3. Clique em **Implantar > Nova implantação**. Na engrenagem, escolha **App da Web**.
   - Executar como: **Eu (seu e-mail)**
   - Quem pode acessar: **Qualquer pessoa**
4. Clique em **Implantar** e autorize com sua conta Google (se aparecer "app não verificado", clique em *Avançado > Acessar*).
5. Copie a **URL do app da Web** (termina em `/exec`). Guarde.

Teste: abra essa URL no navegador — deve aparecer `"Inscrições CANTA Talentos ativas"`.
A aba **Inscricoes** e os títulos das colunas são criados sozinhos na primeira inscrição.

## Passo 2 — Atualizar o projeto
Substitua no seu projeto os arquivos `src/App.tsx`, `src/index.css` e `src/main.tsx` pelos deste pacote, e coloque o `vercel.json` na raiz (ao lado do `package.json`).
Só o `App.tsx` mudou de verdade: o botão "Enviar" agora manda os dados para a planilha.

## Passo 3 — Publicar na Vercel
1. Suba o projeto para o GitHub e importe em https://vercel.com/new (a Vercel detecta Vite sozinha).
2. Antes de clicar em Deploy, abra **Environment Variables** e crie:
   - Nome: `VITE_INSCRICOES_URL`
   - Valor: a URL `/exec` do Passo 1
3. Clique em **Deploy**. Se já tinha publicado, adicione a variável em Settings > Environment Variables e faça **Redeploy**.

## Bom saber
- **Limite de anexos: 30 MB somados.** Acima disso o formulário pede para usar o campo "Link externo" (YouTube, Drive…). É um limite do Google para esse tipo de envio.
- A regra "1 inscrição individual por e-mail" agora é conferida na planilha de verdade (antes valia só no navegador).
- Os arquivos são salvos na pasta com o nome `ID - Nome - arquivo`, e o link aparece na planilha.
- Se mudar o código do Apps Script depois, use **Implantar > Gerenciar implantações > Editar > Nova versão** para manter a mesma URL.
