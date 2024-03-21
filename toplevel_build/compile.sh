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
#  -k | --keep      Keeps OCaml versions installed by this script for compilation
#  -f | --force     Bypasses supported OCaml versions check
#  -y | --overwrite Allows overwrite previous builds
#  -o | --output    Change output directory
# [versions] can be :
#  all    Used to compile all version available
#  4.14.0
#  4.13.1
#  4.13.0
#  4.12.1
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

    # Check if OCaml version $BUILD_VERSION is installed
    if [[ -d "$HOME/.opam/$BUILD_VERSION" ]]; then
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
    opam install --yes js_of_ocaml js_of_ocaml-compiler js_of_ocaml-lwt js_of_ocaml-ppx js_of_ocaml-toplevel js_of_ocaml-tyxml graphics sedlex lwt ocp-indent base zarith zarith_stubs_js dune
    eval $(opam env)

    # Build
    echo "Building toplevel-$BUILD_VERSION.js ..."
    [[ -d "_build" ]] && rm -rf "_build"
    dune clean
    dune build --verbose

    # Remove OCaml version $BUILD_VERSION if it wasn't previously installed
    [[ $VERSION_ALREADY_INSTALLED = false && $KEEP = false ]] && opam switch remove --yes $BUILD_VERSION

    # Save build
    [[ ! -d "$OUTPUT_DIR" ]] && mkdir -p "$OUTPUT_DIR"
    [[ -f "$OUTPUT_DIR/toplevel-$BUILD_VERSION.js" ]] && rm -f "$OUTPUT_DIR/toplevel-$BUILD_VERSION.js"
    cp _build/default/toplevel.js "$OUTPUT_DIR/toplevel-$BUILD_VERSION.js"
    
    # Clean after build
    # dune clean
    
    
}

Usage () {
    echo "Run : ./compile.sh [options] [versions]"
    echo " [options] can be :"
    echo "  -h | --help      Shows this message"
    echo "  -k | --keep      Keeps OCaml version installed by this script for compilation"
    echo "  -f | --force     Bypasses supported OCaml versions check"
    echo "  -y | --overwrite Allows overwrite previous builds"
    echo "  -o | --output    Change output directory"
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
SUPPORTED_OCAML_VERSIONS=(5.1.1 5.1.0 4.14.1 4.14.0 4.13.1 4.13.0 4.12.1 4.12.0 4.11.2 4.11.1 4.11.0 4.10.2 4.10.1 4.10.0 4.09.1 4.09.0 4.08.1 4.08.0 4.07.1 4.07.0 4.06.1 4.06.0)

KEEP=false
FORCE=false
OVERWRITE=false
OUTPUT_DIR="builds"
VERSIONS=()

# Check if arguments were supplied
if [ -z "$1" ]; then
    echo "No argument were supplied"
    Usage
    exit 1
fi

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
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
        -y|--overwrite)
            OVERWRITE=true
        ;;
        -o|--output)
            if [ -z "$2" ]; then
                echo "No output directory was supplied"
                Usage
                exit 1
            fi
            OUTPUT_DIR="$2"
            shift
        ;;
        -*)
            echo "Unknown option $arg"
            Usage
            exit 1
        ;;
        *)
            VERSIONS+=($1)
        ;;
    esac
    shift
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

if [[ " ${VERSIONS[@]} " =~ " all " ]]; then # Build all versions if "all" is set
    for BUILD_VERSION in "${SUPPORTED_OCAML_VERSIONS[@]}"; do
        if [[ -f "$OUTPUT_DIR/toplevel-$BUILD_VERSION.js" && $OVERWRITE = false ]]; then
            echo "Build $BUILD_VERSION already exists"
        else
            echo "Building version $BUILD_VERSION ..."
            Build_Toplevel $BUILD_VERSION
            echo "toplevel-$BUILD_VERSION.js : build complete"
        fi
    done
else # Build all versions in parameters
    for BUILD_VERSION in "${VERSIONS[@]}"; do
        if [[ -f "$OUTPUT_DIR/toplevel-$BUILD_VERSION.js" && $OVERWRITE = false ]]; then
            echo "Build $BUILD_VERSION already exists"
        else
            echo "Building version $BUILD_VERSION ..."
            Build_Toplevel $BUILD_VERSION
            echo "toplevel-$BUILD_VERSION.js : build complete"
        fi
    done
fi

exit 0
