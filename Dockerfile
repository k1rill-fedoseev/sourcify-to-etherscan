FROM node:14

WORKDIR /work

RUN yarn global add sourcify-to-etherscan

ENTRYPOINT sourcify-to-etherscan
