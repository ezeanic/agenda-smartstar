#!/bin/bash

cdir=`pwd`

cd "$cdir/client" && sh -v build_image.sh

cd "$cdir/server" && sh -v build_image.sh

