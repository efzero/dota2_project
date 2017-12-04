import numpy as np
from sklearn.neighbors import NearestNeighbors
import sys
import json
import pickle
from os import path
from sklearn.externals import joblib

def read_in():
	lines = sys.stdin.readlines()

	return lines

def main():
	text = read_in()
	
	mat = np.array(json.loads(text[0]))

	if path.isfile('knn_model.sav'):
		nbrs = joblib.load('knn_model.sav')
		#mat[1] /= 5
		#mat[2] /= 5
		distance2, indices2 = nbrs.kneighbors(np.array([mat[1:]]))
		for i in indices2[0]:
			print(i, end = '')
			if i != indices2[0][-1]:
				print(',', end = '')
		



	

	else:	
		#mat[:-1, 1] /= 5
		#mat[:-1,2] /= 5
		nbrs = NearestNeighbors(n_neighbors = 10, algorithm ='ball_tree').fit(mat[:-1,1:]) 
		distances2, indices2 = nbrs.kneighbors(np.array([mat[-1,1:]]))
		joblib.dump(nbrs, 'knn_model.sav')

		

	

		print('[',  end = '')
		for i in indices2[0]:
		#print(mat[i], end = '')
			print('[', end = '')
			for j in mat[i]:
				print(j, end = '')
				if j != mat[i][-1]:
					print(',', end = '')
			print(']', end = '')

			if i != indices2[0][-1]: 
				print(',', end = '')
		print(']', end = '')

if __name__ == '__main__':
	main()
