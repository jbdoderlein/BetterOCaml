#!/bin/bash

#////////////////////////////////////
#
# BetterOCaml Toplevel Compilation Script
#
#////////////////////////////////////
#
# Created by Mathieu Gouttenoire
#
#////////////////////////////////////
#
# Notes:
#  - This program may take a while to run
#  - It is recommended to have a few gigabytes of free space
#  - This script requires opam
#
#////////////////////////////////////
#
# Usage:
# ./compile.sh [options] [versions]
# [options] can be :
#  -h | --help      Shows this message
#  -f | --keep      Keeps OCaml versions installed by this script for compilation
#  -k | --force     Bypasses supported OCaml versions check
#  -o | --overwrite Allows overwrite previous builds
# [versions] can be :
#  all    Used to compile all version available
#  4.12.0
#  4.11.2
#  4.11.1
#  4.11.0
#  4.10.2
#  4.10.1
#  4.10.0
#  4.09.1
#  4.09.0
#  4.08.1
#  4.08.0
#  4.07.1
#  4.07.0
#  4.06.1
#  4.06.0
# If you want to compile for multiple versions, just separate them with spaces:
#  Example : ./compile.sh 4.11.2 4.12.0
#
#////////////////////////////////////

Build_Toplevel () {
    BUILD_VERSION=$1
    
    cd js_of_ocaml/toplevel/examples/lwt_toplevel
    
    # Check if OCaml version $BUILD_VERSION is installed
    if [[ -d ~/.opam/$BUILD_VERSION ]]; then
        VERSION_ALREADY_INSTALLED=true
    else
        VERSION_ALREADY_INSTALLED=false
    fi
    
    # Switch to OCaml version $BUILD_VERSION
    if [[ $VERSION_ALREADY_INSTALLED = true ]]; then
        opam switch $BUILD_VERSION
    else
        echo "Installing OCaml version $BUILD_VERSION ..."
        opam switch create $BUILD_VERSION
    fi
    
    # Install dependencies
    echo "Installing dependencies ..."
    eval $(opam env)
    opam install --yes tyxml ocp-indent higlo cohttp lwt tyxml reactiveData yojson graphics menhirLib cmdliner ppxlib react menhir dune
    eval $(opam env)
    
    # Build
    echo "Building toplevel-$BUILD_VERSION.js ..."
    dune clean
    dune build
    
    # Remove OCaml version $BUILD_VERSION if it wasn't previously installed
    [[ $VERSION_ALREADY_INSTALLED = false && $KEEP = false ]] && opam switch remove --yes $BUILD_VERSION
    
    # Save build
    cd ../../../..
    [[ ! -d builds/ ]] && mkdir builds
    [[ -f builds/toplevel-$BUILD_VERSION.js ]] && rm -f builds/toplevel-$BUILD_VERSION.js
    cp js_of_ocaml/_build/default/toplevel/examples/lwt_toplevel/toplevel.js builds/toplevel-$BUILD_VERSION.js
}

Usage () {
    echo "Run : ./compile.sh [options] [versions]"
    echo " [options] can be :"
    echo "  -h | --help      Shows this message"
    echo "  -k | --keep      Keeps OCaml version installed by this script for compilation"
    echo "  -f | --force     Bypasses supported OCaml versions check"
    echo "  -o | --overwrite Allows overwrite previous builds"
    echo " [versions] can be :"
    echo " all    Used to compile all version available"
    for AVAILABLE_VERSION in "${SUPPORTED_OCAML_VERSIONS[@]}"; do
        echo " $AVAILABLE_VERSION"
    done
    echo "If you want to compile for multiple versions, just separate them with spaces:"
    echo " Example : ./compile.sh 4.11.2 4.12.0"
}

# These are all the known to work versions
# You can edit this to try older versions but we cannot guarantee it will work
SUPPORTED_OCAML_VERSIONS=(4.12.0 4.11.2 4.11.1 4.11.0 4.10.2 4.10.1 4.10.0 4.09.1 4.09.0 4.08.1 4.08.0 4.07.1 4.07.0 4.06.1 4.06.0)

KEEP=false
FORCE=false
OVERWRITE=false
VERSIONS=()

# Check if arguments were supplied
if [ -z "$1" ]; then
    echo "No argument were supplied"
    Usage
    exit 1
fi

# Parse arguments
for arg in "$@"; do
    case $arg in
        -h|--help|--usage)
            Usage
            exit 0
        ;;
        -k|--keep)
            KEEP=true
        ;;
        -f|--force)
            FORCE=true
        ;;
        -o|--overwrite)
            OVERWRITE=true
        ;;
        -*)
            echo "Unknown option $arg"
            Usage
            exit 1
        ;;
        *)
            VERSIONS+=($arg)
        ;;
    esac
done

# Check if versions are valid only if -f isn't set
if [[ $FORCE = false ]]; then
    for VERSION in "${VERSIONS[@]}"; do
        if [[ ${VERSION} != "all" && ! " ${SUPPORTED_OCAML_VERSIONS[@]} " =~ " ${VERSION} " ]]; then
            echo "Version $VERSION not supported"
            Usage
            exit 1
        fi
    done
fi

# Prepare build by cloning js_of_ocaml and moving files
[[ ! -d js_of_ocaml ]] && git clone https://github.com/ocsigen/js_of_ocaml
cp toplevel.ml js_of_ocaml/toplevel/examples/lwt_toplevel/toplevel.ml
cp dune js_of_ocaml/toplevel/examples/lwt_toplevel/dune
        
if [[ " ${VERSIONS[@]} " =~ " all " ]]; then # Build all versions if "all" is set
    for BUILD_VERSION in "${SUPPORTED_OCAML_VERSIONS[@]}"; do
        if [[ -f builds/toplevel-$BUILD_VERSION.js && $OVERWRITE = false ]]; then
            echo "Build $BUILD_VERSION already exists"
        else
            echo "Building version $BUILD_VERSION ..."
            Build_Toplevel $BUILD_VERSION
            echo "toplevel-$BUILD_VERSION.js : build complete"
        fi
    done
else # Build all versions in parameters
    for BUILD_VERSION in "${VERSIONS[@]}"; do
        if [[ -f builds/toplevel-$BUILD_VERSION.js && $OVERWRITE = false ]]; then
            echo "Build $BUILD_VERSION already exists"
        else
            echo "Building version $BUILD_VERSION ..."
            Build_Toplevel $BUILD_VERSION
            echo "toplevel-$BUILD_VERSION.js : build complete"
        fi
    done
fi

exit 0
