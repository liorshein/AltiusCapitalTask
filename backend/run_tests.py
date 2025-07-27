#!/usr/bin/env python3
"""
Test runner script for the backend API
Provides convenient commands to run different test suites
"""

import subprocess
import sys
import argparse

def run_command(command):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print(result.stderr, file=sys.stderr)
        return result.returncode
    except Exception as e:
        print(f"Error running command: {e}", file=sys.stderr)
        return 1

def main():
    parser = argparse.ArgumentParser(description="Run backend tests")
    parser.add_argument("--unit", action="store_true", help="Run unit tests only")
    parser.add_argument("--integration", action="store_true", help="Run integration tests only")
    parser.add_argument("--e2e", action="store_true", help="Run e2e tests only")
    parser.add_argument("--coverage", action="store_true", help="Run tests with coverage")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")
    
    args = parser.parse_args()
    
    # Base pytest command
    cmd = "pytest"
    
    # Add verbosity
    if args.verbose:
        cmd += " -v"
    
    # Add coverage
    if args.coverage:
        cmd += " --cov=. --cov-report=html --cov-report=term"
    
    # Add test markers
    if args.unit:
        cmd += " -m unit"
    elif args.integration:
        cmd += " -m integration"
    elif args.e2e:
        cmd += " -m e2e"
    
    print(f"Running: {cmd}")
    return run_command(cmd)

if __name__ == "__main__":
    sys.exit(main())