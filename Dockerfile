FROM ubuntu:20.04


RUN apt update -y && apt install -y tzdata
ENV TZ Asia/Tokyo
RUN apt update -y && apt install -y npm
RUN apt install -y wget
RUN npm install n -g 
RUN n latest 
RUN apt purge -y npm 
RUN ln -sf /usr/local/bin/node /usr/bin/node 
RUN ln -sf /usr/local/bin/npm /usr/bin/npm


RUN apt install -y slurmd slurmctld openssh-server libmunge-dev

RUN mkdir /var/run/sshd

RUN echo -n "beaver" | sha1sum | cut -d' ' -f1 >/etc/munge/munge.key
ADD slurm.conf /etc/slurm-llnl/slurm.conf
ADD entrypoint.sh /usr/tmp/entrypoint.sh

RUN apt install -y vim

ENTRYPOINT ["/usr/tmp/entrypoint.sh"]
CMD ["tail","-f","/dev/null"]
