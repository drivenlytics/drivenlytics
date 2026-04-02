#!/usr/bin/env python3
import json
import argparse
import sys
from pathlib import Path

def load_framework(filepath):
    """Loads the BAV 48 framework JSON."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find framework file at {filepath}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {filepath}", file=sys.stderr)
        sys.exit(1)

def score_archetypes(selected_attributes, framework):
    """
    Calculates scores for each archetype based on selected attributes.
    Returns a sorted list of tuples (archetype_name, score).
    """
    scores = {archetype: 0 for archetype in framework['archetypes']}
    
    # Create attribute lookup dictionary for faster access
    attr_dict = {attr['name'].lower(): attr for attr in framework['attributes']}
    
    found_count = 0
    for attr_name in selected_attributes:
        attr_name_lower = attr_name.strip().lower()
        if attr_name_lower in attr_dict:
            found_count += 1
            weights = attr_dict[attr_name_lower].get('weights', {})
            for archetype, weight in weights.items():
                if archetype in scores:
                    scores[archetype] += weight
        else:
            print(f"Warning: Attribute '{attr_name}' not found in framework.", file=sys.stderr)
            
    if found_count == 0:
        print("Warning: No valid attributes provided for scoring.", file=sys.stderr)
            
    # Sort archetypes by score descending
    sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True)
    return sorted_scores

def main():
    parser = argparse.ArgumentParser(description='Calculate BAV Archetype profiles from selected attributes.')
    parser.add_argument('--attributes', '-a', nargs='+', required=True, 
                        help='List of selected attributes (e.g., "Leader" "Innovative" "Strong")')
    parser.add_argument('--framework', '-f', default='../knowledge/bav-48-framework.json',
                        help='Path to the BAV framework JSON file')
    
    args = parser.parse_args()
    
    # Resolve framework path relative to the script location if it's a relative path
    framework_path = Path(args.framework)
    if not framework_path.is_absolute():
        script_dir = Path(__file__).parent
        framework_path = script_dir / args.framework

    framework = load_framework(framework_path)
    
    print(f"Scoring based on attributes: {', '.join(args.attributes)}\n")
    
    results = score_archetypes(args.attributes, framework)
    
    print("--- Archetype Profile Results ---")
    
    # Print Top 3 Archetypes
    for i in range(min(3, len(results))):
        archetype, score = results[i]
        label = "Primary" if i == 0 else f"Secondary {i}"
        print(f"{label}: \t{archetype} (Score: {score})")
        
    print("\n--- Full Breakdown ---")
    for archetype, score in results:
        if score > 0:
            print(f"{archetype}: {score}")

if __name__ == '__main__':
    main()
