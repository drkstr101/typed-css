FROM gitpod/workspace-full

# Update system
RUN sudo apt-get update && \
  sudo apt-get upgrade -y

# Install graphviz
RUN sudo apt-get install graphviz zsh zip unzip -y

# Install ohmyzsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install global node_modules
ENV PATH=$HOME/bin:$PATH
RUN export PATH=$HOME/bin:$PATH && \
  npm i -g npm yarn pm2 nx @teambit/bvm && \
  bvm install && \
  bit config set analytics_reporting true && \
  bit config set interactive false
