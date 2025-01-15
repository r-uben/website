#!/bin/bash

# Create temporary directory
echo "Creating temporary directory..."
mkdir -p temp_clone

# Clone the repository
echo "Cloning term_structure repository..."
git clone https://github.com/r-uben/term_structure.git temp_clone/term_structure

# Create destination directory if it doesn't exist
echo "Creating destination directory..."
mkdir -p images/2024_favero

# Copy the SVG file
echo "Copying SVG file..."
cp temp_clone/term_structure/data/figures/term_premia_comparison.svg images/2024_favero/term_premia_comparison.svg

# Remove the temporary directory and cloned repo
echo "Cleaning up..."
rm -rf temp_clone

echo "Done! The SVG file has been moved to images/2024_favero/"
