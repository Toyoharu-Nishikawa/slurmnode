import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

import child_process from 'child_process'
const {exec, spawn} = child_process

const fsp = fs.promises

const app = express()
app.set('port', 5000)

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
  console.log("I'm working")
  res.json({message: "I'm working"})
})

app.get('/slurm',async (req,res)=>{
  const text = 
`#!/bin/bash
#SBATCH --job-name=example
#SBATCH --partition=alpha

echo "slurm test from node.js"
sleep 10
docker run hello-world
`
  const dir = "/mnt/test"
  const fileName = "run.sh"
  const filePath = dir + "/" + fileName
  await fsp.writeFile( filePath , text) 
  const command = `cd ${dir} && sbatch run.sh`
  exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(`stderr: ${stderr}`)
        res.json({message: stderr})
        return
      }
      console.log(`stdout: ${stdout}`)
      res.json({message: stdout})
    }
  )
})



app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'))
});

