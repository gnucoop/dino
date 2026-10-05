---
title: Área do utilizador
description: Faça a gestão das definições da sua conta no Dino — altere a sua senha, consulte a sua chave e os seus créditos DINO-AI, personalize o tema DINO, faça backup ou restauro dos seus dados e inicie a visita guiada do Dino.
---

# Área do utilizador

A **Área do utilizador** é a sua página pessoal de conta. Reúne tudo o que lhe pertence a si e não a toda a instalação do Dino: os seus dados de início de sessão, a sua chave e os seus créditos DINO-AI, as cores que o Dino usa para si, o backup e o restauro de dados e a visita guiada.

O cabeçalho da página mostra as suas iniciais, o seu nome completo e o seu endereço de email, para que possa confirmar sempre com que conta tem a sessão iniciada. A versão do Dino atualmente em execução é apresentada no canto superior direito.

![Vista principal da página Área do utilizador](../imgs/user-area/index.png)

A Área do utilizador está organizada em separadores. O separador em que se encontra faz parte do endereço da página, pelo que pode guardar um separador específico nos favoritos e regressar a ele diretamente. Alternar entre separadores não altera o histórico do navegador — ao premir Voltar, sai da Área do utilizador em vez de percorrer os separadores que visitou.

## Alterar a sua senha

O separador **Senha** é onde atualiza a senha que usa para iniciar sessão no Dino.

1. No campo **Senha atual**, escreva a senha que está a usar agora.
2. No campo **Nova Senha**, escreva a sua nova senha. Deve ter, no mínimo, o número de caracteres indicado abaixo do campo.
3. No campo **Confirme nova senha**, escreva novamente a nova senha.
4. Selecione **Atualizar senha**.

Se quiser começar de novo, selecione **Cancelar** para limpar os três campos. Se a senha atual não corresponder, o Dino informa-o disso e nenhuma alteração é feita.

!!! tip "Escolha uma senha forte"
    Use uma senha que não utilize em mais nenhum sítio e guarde-a num gestor de senhas. Consulte [Repor senha](../getting-started/reset-password.md) se se esqueceu da senha atual e não consegue iniciar sessão.

## Chave e créditos DINO-AI

O separador **IA** mostra a chave DINO-AI que pertence à sua conta, juntamente com o número de créditos DINO-AI que ainda tem.

- Selecione **Mostrar** para revelar a chave, ou **Ocultar** para a mascarar novamente.
- Selecione **Copiar** para colocar a chave na área de transferência.
- Se a sua instalação permitir a compra de créditos, selecione **Adicione mais** para os recarregar.

A chave é emitida automaticamente para a sua conta quando inicia sessão — não há nada para colar aqui. Se não estiver associada nenhuma chave à sua conta, o separador indica-o.

## Tema DINO

O separador **Tema DINO** controla as cores que o Dino usa para si. As alterações de cor só são aplicadas depois de as guardar, para que possa experimentar livremente; a escolha entre modo claro e escuro é aplicada imediatamente.

1. Selecione os campos **Cor primária**, **Cor de destaque** e **Cor de aviso** e escolha uma cor no seletor.
2. Utilize o campo **Nome da predefinição** para dar um nome à combinação, ou escolha um nome existente na lista.
3. Alterne entre o modo claro e escuro através dos botões de sol e lua.
4. Selecione **Guardar tema** para aplicar as suas escolhas.

O painel **Pré-visualização** mostra como as cores selecionadas ficarão antes de as confirmar. **Carregar predefinição** recupera uma combinação guardada e **Repor** descarta as suas alterações e volta ao tema atualmente aplicado.

!!! tip "Os temas ficam guardados neste navegador"
    O seu tema e as suas predefinições guardadas ficam armazenados no navegador que está a utilizar. Noutro navegador ou dispositivo, o Dino começa com o tema predefinido.

## Backup e restauro

O separador **Backup e restauro** permite-lhe transferir uma cópia completa dos seus dados ou voltar a carregá-la. É apresentado apenas aos administradores e apenas quando o backup e o restauro estão ativados na sua instalação.

Para fazer backup dos seus dados:

1. Selecione **Transferir backup**.
2. Guarde o ficheiro, com o nome `dino_db_export.json`, num local seguro.

Para restaurar dados:

1. Selecione **Escolher um ficheiro de backup** e escolha um ficheiro `.json` exportado do Dino.
2. Confirme o restauro quando o Dino o solicitar.
3. Aguarde enquanto o Dino restaura os dados. É apresentado um indicador de carregamento até o processo terminar.

!!! warning "O restauro substitui os dados correspondentes"
    Os dados do ficheiro são escritos na base de dados local deste dispositivo: qualquer registo com o mesmo ID de um registo importado é substituído. Faça um backup novo antes de restaurar e certifique-se de que o ficheiro é realmente o que pretende.

## Tutoriais

O separador **Tutoriais** só é apresentado quando a visita guiada está configurada na sua instalação e contém uma única ação. Selecione **Start Dino Tour** para iniciar a visita guiada às principais funcionalidades do Dino — uma revisão útil se é novo na plataforma ou se quer revisitar uma área específica.

## Páginas relacionadas

- [Iniciar sessão](../getting-started/login.md)
- [Repor senha](../getting-started/reset-password.md)
- [Navegação principal](../interface/index.md)